import React, { FormEvent, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../../services/api';

import Button from '../../genericComponents/Button';
import { ICategory } from '../ListCategories';
import CategoriesReference from '../CategoriesReference';

import { Container } from './styles';

interface IProps {
    updating: React.Dispatch<React.SetStateAction<boolean>>;
    updatingCategory: ICategory
}

export default function UpdateCategory({ updating, updatingCategory }: IProps) {

    const [getName, setName] = useState(updatingCategory.name);
    const [getParentId, setParentId] = useState(String(updatingCategory.parent_id));

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getIsFetching, setIsFetching] = useState(false);
    const [getIsSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if(getName.trim().length < 3){
            setIsSubmitButtonDisabled(true);
        } else {
            setIsSubmitButtonDisabled(false);
        }
    }, [getName]);

    async function fetchCategories() {
        try {

            const response = await api.get<ICategory[]>('/categories');

            const categories = response.data.filter((category) => category.id != updatingCategory.id);

            setCategories(categories);

        } catch (error) {
            console.error(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {

        event.preventDefault();

        if(getIsSubmitButtonDisabled) return;

        const [parentCategory] = getCategories.filter((category) => category.id == Number(getParentId));
        if (parentCategory && updatingCategory.id == parentCategory.parent_id) return alert('Categorias não podem ser filhas umas das outras');

        try {
            setIsFetching(true);
            await api.put(`/categories/${updatingCategory.id}`, {
                name: getName,
                parent_id: getParentId
            });
            setIsFetching(false);
            updating(false);

        } catch (error) {
            console.error(error);
            alert('Erro a atualizar categoria');
            setIsFetching(false);
        }
    }

    return (
        <Container data-testid='update-category-container'>

            <form onSubmit={onSubmit}>

                <header>
                    <button type='button' onClick={() => updating(false)}>X</button>
                </header>
                <main>

                    <div className="input-group">
                        <label htmlFor="category-name">Nome da categoria</label>
                        <input type="text" id='category-name' value={getName} onChange={(event) => setName(event.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="select-parent">Pai da categoria</label>
                        <select id="select-parent" value={getParentId} onChange={(event) => setParentId(event.target.value)}>
                            <option value="0"></option>
                            {getCategories.map((category, index) => (
                                <option key={index} value={String(category.id)}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button
                        type='submit'
                        disabled={getIsFetching || getIsSubmitButtonDisabled}
                        className={`${getIsFetching && 'is-fetching'}`}
                    >
                        {getIsFetching
                            ? (
                                <Loader
                                    type="TailSpin"
                                    color="#0D2235"
                                    height={30}
                                    width={30}
                                />
                            )
                            : (
                                'Atualizar'
                            )
                        }
                    </Button>
                </main>

                <footer>
                    <CategoriesReference categories={getCategories} />
                </footer>
            </form>

        </Container>
    );
}
