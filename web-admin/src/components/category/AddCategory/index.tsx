import React, { FormEvent, useEffect, useState } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../generic/Button';

interface ICategory {
    id: number;
    name: string;
    parent_id: number;
}

export default function AddCategory(){

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getName, setName] = useState('');
    const [getParent, setParent] = useState('');

    useEffect( () => {
        fetchCategories();
    }, []);

    async function fetchCategories(){

        try {

            const response = await api.get('/categories');

            setCategories(response.data);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        try {

            await api.post('/categories', {
                name: getName,
                parent_id: (getParent.length > 0) ? getParent : undefined
            });

            alert('Categoria cadastrada com sucesso');

            setName('');
            setParent('');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar categoria');
        }
    }

    return (
        <Container>
            
            <form onSubmit={onSubmit}>

                <div className="input-box">
                    <label htmlFor="category-name">Nova categoria</label>
                    <input type="text" id='category-name' value={getName} onChange={(event) => setName(event.target.value)} />
                </div>

                <div className="input-box">
                    <label htmlFor="category-parent">Pai</label>

                    <select id="category-parent" value={getParent} onChange={(event) => setParent(event.target.value)}>
                        <option value={null}></option>
                        {getCategories.map( (category, index) => {
                            return <option key={index} value={category.id}>{category.name}</option>
                        })}

                    </select>
                </div>

                <Button type='submit'>
                    Cadastrar
                </Button>
            </form>

        </Container>
    );
}
