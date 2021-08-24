import React, { useState, useEffect, FormEvent } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../../services/api';

import Button from '../../genericComponents/Button';
import { ICategory } from '../ListCategories';
import CategoriesReference from '../CategoriesReference';

import { Container } from './styles';

interface IProps {
    deletingCategory: ICategory;
    deleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCategory({ deletingCategory, deleting }: IProps) {

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getTrasferTo, setTrasferTo] = useState("0");

    const [getIsSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
    const [getIsFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (getTrasferTo == '0') {
            setIsSubmitButtonDisabled(true);
        } else {
            setIsSubmitButtonDisabled(false);
        }
    }, [getTrasferTo]);

    async function fetchCategories() {
        try {

            const response = await api.get<ICategory[]>('/categories');

            const categories = response.data.filter(category => category.id != deletingCategory.id);

            setCategories(categories);

        } catch (error) {
            console.log(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {

        event.preventDefault();

        if (getIsSubmitButtonDisabled) return alert('Você deve selecionar uma categoria para transferir os produtos, se houver.');
        if(getIsFetching) return;

        if (confirm(`Tem certeza que deseja deletar "${deletingCategory.name}"?`)) {
            try {

                setIsFetching(true);
                await api.delete(`/categories/${deletingCategory.id}`, {
                    data: {
                        transferToId: Number(getTrasferTo)
                    }
                });
                setIsFetching(false);

                alert('Categoria deletada com sucesso');

                deleting(false);

            } catch (error) {
                console.log(error);
                alert('Erro ao deletar categoria');
                setIsFetching(false);
            }
        }
    }

    return (
        <Container data-testid='delete-category-container'>

            <form onSubmit={onSubmit}>
                <header>
                    <button 
                        type='button' 
                        data-testid='close-button' 
                        onClick={() => deleting(false)}
                    >
                        X
                    </button>
                </header>
                <main>
                    <h3>{deletingCategory.name}</h3>

                    <div className="input-group">
                        <label htmlFor="transfer-to">Transferir produtos para:</label>
                        <select
                            id="transfer-to"
                            data-testid="transfer-to"
                            value={getTrasferTo}
                            onChange={(event) => setTrasferTo(event.target.value)}
                        >
                            <option value="0"></option>
                            {getCategories.map((category) => (
                                <option key={category.id} value={String(category.id)}>{category.name} (id: {category.id})</option>
                            ))}
                        </select>
                    </div>

                    <Button
                        type='submit'
                        data-testid='submit-button'
                        disabled={getIsSubmitButtonDisabled || getIsFetching}
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
                                'Deletar'
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
