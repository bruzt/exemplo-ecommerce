import React from 'react';
import css from 'styled-jsx/css';
import { FaCaretDown, FaCaretRight, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { useFilterBar } from '../context/filterBarContext';

export default function MenuAndSearchBar() {

    const router = useRouter();
    const filterBarContext = useFilterBar();

    function handleSearch(event) {

        event.preventDefault();

        if(String(filterBarContext.getSearchBarText).length > 0){

            router.push({
                pathname: '/search',
                query: {
                    title: filterBarContext.getSearchBarText
                }
            });
        }
    }

    function categoryTree(){

        const firstLevels = filterBarContext.getCategories.filter(item => !item.parent);

        return (
            <>
                <ul jsx={categoryMenuStyle}>
                    <li>Categorias <FaCaretDown />
                        <ul>
                            {firstLevels.map( (firstLevel) => buildCategoryTree(firstLevel))}   
                        </ul>
                    </li>
                </ul>

                <style jsx>{categoryMenuStyle}</style>
            </>
        );
    }

    function buildCategoryTree(category){

        const children = filterBarContext.getCategories.filter(child => child.parent == category.id)

        let hasChildren = false;

        if (children.length > 0) hasChildren = true;

        return (
            <React.Fragment key={category.id}>

                <li 
                    className={`${(hasChildren) ? 'has-children' : ''}`} 
                    onClick={(event) => handleCategorySearch(event, category)}
                >
                    {category.name} {(hasChildren) && <FaCaretRight />}
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

    function handleCategorySearch(event, category){

        event.stopPropagation();

        router.push({
            pathname: '/search',
            query: {
                categoryId: category.id,
                categoryName: category.name
            }
        });
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
                }

                nav .limit-center form button {
                    width: 40px;
                    height: 40px;
                    border: none;
                    cursor: pointer;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
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
        width: 150px; 
        background: #0D2235; 
        float: left; 
        height: 40px; 
        line-height: 40px; 
        font-size: 20px;
        text-align: center; 
        position: relative;
        user-select: none; 
        border-radius: 2px; 
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
        left: 150px; 
        top: 0; 
    }

    li:hover > ul {
        display: block;
    }

    li.has-children:hover > ul { 
        display: block;
    }  
`;
