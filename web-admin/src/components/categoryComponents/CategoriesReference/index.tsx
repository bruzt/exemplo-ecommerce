import React from 'react';

import { ICategory } from '../AddCategory';

import { Container } from './styles';

interface IProps {
    categories: ICategory[];
}

export default function CategoriesReference({ categories }: IProps){

    function buildCategoryTree(fatherCategory: ICategory) {

		const children = categories.filter(child => child.parent_id == fatherCategory.id)

		return children.map(child => {

			const childs = categories.filter((category) => child.id == category.parent_id);

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

	function categoryTree() {
		return categories.map(category => {

			if (category.parent_id == null || category.parent_id == 0) {

				const childs = categories.filter((othersCategory) => othersCategory.parent_id == category.id);
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

    return (
        <Container>
            {categoryTree()}
        </Container>
    );
}