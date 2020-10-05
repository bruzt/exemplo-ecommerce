import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import PencilIcon from '../../generic/icons/Pencil';
import TrashIcon from '../../generic/icons/TrashCan';
import UpdateCategory from '../UpdateCategory';

export interface ICategory {
    id: number;
    name: string;
    parent_id: number;
}

export default function ListCategories(){

    const [getCategories, setCategories] = useState<ICategory[]>([]);
    
    const [isUpdating, setUpdating] = useState(false);
    const [getUpdatingCategory, setUpdatingCategory] = useState<ICategory>({} as ICategory);

	useEffect( () => {
		if(isUpdating == false) fetchCategories();
	}, [isUpdating]);

	async function fetchCategories(){

		try {

			const response = await api.get('/categories');

			setCategories(response.data);
			
		} catch (error) {
			console.log(error);
			alert('Erro ao buscar categorias');
		}
    }
    
    function handleUpdate(category: ICategory){

        setUpdatingCategory(category);
        setUpdating(true);
    }

	return (
		<Container>
            
            {isUpdating && <UpdateCategory updatingCategory={getUpdatingCategory} updating={setUpdating} />}
			
			<table>
                <thead>
                    <tr>
                        <th style={{ width: 50 }}>ID</th>
                        <th style={{ minWidth: 300 }}>Nome</th>
                        <th style={{ minWidth: 300 }}>Pai</th>
                        <th style={{ width: 100 }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getCategories.map( (category, index) => {

                        const [parentCategory] = getCategories.filter( (categoryItem) => categoryItem.id == category.parent_id);
                        
                        return (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td className='name'>{category.name}</td>
                                <td>{parentCategory && parentCategory.name}</td>
                                <td id='td-actions'>
                                    <div>
                                        <button type='button' onClick={() => handleUpdate(category)}>
                                            <PencilIcon title='Editar' />
                                        </button>
                                        <button type='button'>
                                            <TrashIcon title='Excluir' />
                                        </button>
                                    </div>
                        </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

		</Container>
	);
}
