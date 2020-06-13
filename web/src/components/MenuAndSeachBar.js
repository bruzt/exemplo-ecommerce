import React, { useState } from 'react';
import css from 'styled-jsx/css';
import { FaCaretDown, FaCaretRight, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ClickAwayListener from 'react-click-away-listener';

import { useFilterBar } from '../context/filterBarContext';

export default function MenuAndSearchBar() {

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
            <>
                <ClickAwayListener onClickAway={() => setActiveCategoryMenu(false)}>
                    <ul jsx={categoryMenuStyle}>
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

                <style jsx>{categoryMenuStyle}</style>
            </>
        );
    }

    function buildCategoryTree(category){

        const children = filterBarContext.getCategories.filter(child => child.parent_id == category.id)

        let hasChildren = false;

        if (children.length > 0) hasChildren = true;

        return (
            <React.Fragment key={category.id}>

                <li 
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

                <style jsx>{categoryMenuStyle}</style>

            </React.Fragment>
        );
    }

    return (
        <>
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

            <style jsx>{`
                nav {
                    width: 100%;
                    height: 50px;
                    background: #16324C;
                }

                nav .limit-center {
                    width: 100%;
                    height: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                nav .limit-center form {
                    display: flex;
                    justify-content: center;
                }

                nav .limit-center form input {
                    width: 400px;
                    height: 40px;
                    padding: 5px;
                    border: none;
                    font-size: 20px;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    text-align: center;
                }

                nav .limit-center form button {
                    width: 40px;
                    height: 40px;
                    border: none;
                    cursor: pointer;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    margin: 0 200px 0 0;
                }

                @media (max-width: 900px) {
                    nav .limit-center form input {
                        width: 100%;
                        max-width: 400px;
                    }

                    nav .limit-center form button {
                        margin: 0;
                    }
                }
            `}</style>
        </>
    );
}

const categoryMenuStyle = css`
    ul {
        list-style: none;
        z-index: 10;
    }
                
    ul li { 
        width: 200px; 
        height: 40px; 
        background: #0D2235; 
        float: left; 
        line-height: 40px; 
        font-size: 20px;
        text-align: center; 
        user-select: none; 
        position: relative;
    }

    ul li.category-menu {
        border-radius: 5px;
    }

    ul li p {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
                
    ul li:hover { 
        background: #16324C;
    }

    ul li:active { 
        background: #0D2235;
    }

    li > ul {
        display: none;
    }

    li.has-children > ul {
        position: absolute; 
        left: 200px; 
        top: 0; 
    }

    li.active > ul {
        display: block;
    }

    li.has-children:hover > ul { 
        display: block;
    }  
`;
