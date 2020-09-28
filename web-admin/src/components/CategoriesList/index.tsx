import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { Container } from './styles';

import PencilIcon from '../Icons/Pencil';
import TrashIcon from '../Icons/TrashCan';

export default function CategoriesList(){

	const [getCategories, setCategories] = useState([{ id: 1, name: 'aaa', parent_id: 0 }]);

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

	return (
		<Container>
			
			<table>
                <thead>
                    <tr>
                        <th style={{ width: 50 }}>ID</th>
                        <th style={{ width: 300 }}>Nome</th>
                        <th style={{ width: 100 }}>Pai</th>
                        <th style={{ width: 100 }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getCategories.map( (category, index) => (
                        <tr key={index}>
                            <td>{category.id}</td>
                            <td className='name'>{category.name}</td>
                            <td>{category.parent_id}</td>
                            <td id='td-actions'>
                                <div>
                                    <button type='button'>
                                        <PencilIcon title='Editar' />
                                    </button>
                                    <button type='button'>
                                        <TrashIcon title='Excluir' />
									</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

		</Container>
	);
}
