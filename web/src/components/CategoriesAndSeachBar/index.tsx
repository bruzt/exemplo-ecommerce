import React, { useState } from 'react';
import { FaCaretDown, FaCaretRight, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ClickAwayListener from 'react-click-away-listener';

import { ICategory, useFilterBar } from '../../contexts/filterBarContext';

import { Container, CategoryDropdownMenu } from './styles';

export default function CategoriesAndSeachBar() {
    
    const [getActiveCategoryMenu, setActiveCategoryMenu] = useState(false);

    const router = useRouter();
    const filterBarContext = useFilterBar();

    function handleSearch(event) {

        event.preventDefault();

        if(String(filterBarContext.getSearchBarText).length > 0){

            delete router.query.categoryId;
            delete router.query.category;

            router.push({
                pathname: '/search',
                query: {
                    ...router.query,
                    page: 1,
                    title: filterBarContext.getSearchBarText,
                }
            });
        }
    }

    function handleCategorySearch(event, category){

        event.stopPropagation();

        setActiveCategoryMenu(!getActiveCategoryMenu);

        delete router.query.title;

        router.push({
            pathname: '/search',
            query: {
                ...router.query,
                categoryId: category.id,
                page: 1,
                category: String(category.name).split(' ').join('-')
            }
        });
    }

    function categoryTree(){

        const firstLevels = filterBarContext.getCategories.filter(item => !item.parent_id);

        return (
            <CategoryDropdownMenu>
                <ClickAwayListener onClickAway={() => setActiveCategoryMenu(false)}>
                    <ul>
                        <li
                            className={`category-menu ${(getActiveCategoryMenu) ? 'active' : ''}`}
                            onClick={() => setActiveCategoryMenu(!getActiveCategoryMenu)}
                        >
                            <p>Categorias <FaCaretDown /></p>
                            <ul>
                                {firstLevels.map( (firstLevel) => buildCategoryTree(firstLevel))}   
                            </ul>
                        </li>
                    </ul>
                </ClickAwayListener>
            </CategoryDropdownMenu>
        );
    }

    function buildCategoryTree(category: ICategory){

        const children = filterBarContext.getCategories.filter(child => child.parent_id == category.id)

        let hasChildren = false;

        if (children.length > 0) hasChildren = true;

        return (
            <li 
                key={category.id}
                className={`${(hasChildren) ? 'has-children' : ''}`} 
                onClick={(event) => handleCategorySearch(event, category)}
            >
                <p>{category.name} {(hasChildren) && <FaCaretRight />}</p>
                {(hasChildren) && (
                    <ul>
                        {children.map( (child) => buildCategoryTree(child))}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <Container>
            <nav>
                <div className="limit-center">

                    {categoryTree()}    

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder='Pesquise o seu produto'
                            value={filterBarContext.getSearchBarText}
                            onChange={(event) => filterBarContext.setSearchBarText(event.target.value)}
                        />
                        <button type='submit'>
                            <FaSearch />
                        </button>
                    </form>

                    <span></span>
                </div>
            </nav>
        </Container>
    );
}
