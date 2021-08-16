import React, { FormEvent, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../genericComponents/Button';

interface ICategory {
	id: number;
	name: string;
	parent_id: number;
}

export default function AddCategory() {

	const [getCategories, setCategories] = useState<ICategory[]>([]);

	const [getName, setName] = useState('');
	const [getParent, setParent] = useState('0');

	const [getIsFetching, setIsFetching] = useState(false);
	const [getIsSubmitButtonDisable, setIsSubmitButtonDisable] = useState(true);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if(getName.trim().length < 3){
			setIsSubmitButtonDisable(true);
		} else {
			setIsSubmitButtonDisable(false);
		}
	}, [getName]);

	async function fetchCategories() {
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

		if(getIsSubmitButtonDisable) return;

		try {

			setIsFetching(true);
			await api.post('/categories', {
				name: getName,
				parent_id: Number(getParent)
			});
			setIsFetching(false);

			alert('Categoria cadastrada com sucesso');

			fetchCategories();
			setName('');
			setParent('');

		} catch (error) {
			console.log(error);
			alert('Erro ao cadastrar categoria');
			setIsFetching(false);
		}
	}

	function categoryTree() {
		return getCategories.map(category => {

			if (category.parent_id == null || category.parent_id == 0) {

				const childs = getCategories.filter((othersCategory) => othersCategory.parent_id == category.id);
				let hasChildren = false;
				if (childs.length > 0) hasChildren = true;

				return (
					<details key={category.id}>
						<summary className={hasChildren ? '' : 'last-child'}>{category.name} (id: {category.id})</summary>
						{buildCategoryTree(category)}
					</details>
				);
			}
		});
	}

	function buildCategoryTree(fatherCategory: ICategory) {

		const children = getCategories.filter(child => child.parent_id == fatherCategory.id)

		return children.map(child => {

			const childs = getCategories.filter((category) => child.id == category.parent_id);

			let hasChildren = false;
			if (childs.length > 0) hasChildren = true;

			return (
				<details key={child.id}>
					<summary className={hasChildren ? '' : 'last-child'}>{child.name} (id: {child.id})</summary>
					{hasChildren && buildCategoryTree(child)}
				</details>
			);
		});
	}

	return (
		<Container>

			<h2>Adicionar categoria</h2>

			<form onSubmit={onSubmit}>

				<div className="input-box">
					<label htmlFor="category-name">Nova categoria</label>
					<input type="text" id='category-name' value={getName} onChange={(event) => setName(event.target.value)} />
				</div>

				<div className="input-box">
					<label htmlFor="category-parent">Pai</label>

					<select id="category-parent" value={getParent} onChange={(event) => setParent(event.target.value)}>
						<option value={'0'}></option>
						{getCategories.map((category, index) => {
							return <option key={index} value={String(category.id)}>{category.id} - {category.name}</option>
						})}

					</select>
				</div>

				<Button
					type='submit'
					disabled={getIsFetching || getIsSubmitButtonDisable}
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
							'Cadastrar'
						)
					}
				</Button>
			</form>

			<div className="categoryTree">
				{categoryTree()}
			</div>

		</Container>
	);
}
