import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../generic/Button';

import { ICategory } from '../ListCategories';

interface IProps {
    deletingCategory: ICategory;
    deleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCategory({ deletingCategory, deleting}: IProps) {

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getTrasferTo, setTrasferTo] = useState("0");

    useEffect( () => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {

            const response = await api.get<ICategory[]>('/categories');

            const categories = response.data.filter( category => category.id != deletingCategory.id);

            setCategories(categories);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        if(getTrasferTo.trim() == "0") return alert('Você deve selecionar uma categoria para transferir os produtos, se houver.');

        if(confirm(`Tem certeza que deseja deletar "${deletingCategory.name}"?`)){
            try {

                await api.delete(`/categories/${deletingCategory.id}`, {
                    data: {
                        transferToId: Number(getTrasferTo)
                    }
                });

                alert('Categoria deletada com sucesso');

                deleting(false);

            } catch (error) {
                console.log(error);
                alert('Erro ao deletar categoria');
            }
        }
    }

    return (
        <Container>

            <form onSubmit={onSubmit}>
                <header>
                    <button type='button' onClick={() => deleting(false)}>
                        X
                    </button>
                </header>
                <main>
                    <h3>{deletingCategory.name}</h3>

                    <div className="input-group">
                        <label htmlFor="transfer-to">Transferir produtos para:</label>
                        <select 
                            id="transfer-to"
                            value={getTrasferTo}
                            onChange={(event) => setTrasferTo(event.target.value)}
                        >
                            <option value="0"></option>
                            {getCategories.map( (category) => (
                                <option key={category.id} value={String(category.id)}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button type='submit'>Deletar</Button>
                </main>
            </form>
            
        </Container>
    );
}
