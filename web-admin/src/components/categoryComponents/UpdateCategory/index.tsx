import React, { FormEvent, useEffect, useState } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../genericComponents/Button';

import { ICategory } from '../ListCategories';

interface IProps {
    updating: React.Dispatch<React.SetStateAction<boolean>>;
    updatingCategory: ICategory
}

export default function UpdateCategory({ updating, updatingCategory }: IProps) {

    const [getName, setName] = useState(updatingCategory.name);
    const [getParentId, setParentId] = useState(String(updatingCategory.parent_id));

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    useEffect( () => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        
        try {

            const response = await api.get<ICategory[]>('/categories');

            const categories = response.data.filter( (category) => category.id != updatingCategory.id);

            setCategories(categories);
            
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        const [parentCategory] = getCategories.filter( (category) => category.id == Number(getParentId));
        if(parentCategory && updatingCategory.id == parentCategory.parent_id) return alert('Categorias não podem ser filhas umas das outras');

        try {

            await api.put(`/categories/${updatingCategory.id}`,{
                name: getName,
                parent_id: getParentId
            });

            updating(false);
            
        } catch (error) {
            console.error(error);
            alert('Erro a atualizar categoria');
        }
    }

    return (
        <Container>
            
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
                            {getCategories.map( (category, index) => (
                                <option key={index} value={String(category.id)}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button type='submit'>Atualizar</Button>

                </main>
                
            </form>

        </Container>
    );
}
