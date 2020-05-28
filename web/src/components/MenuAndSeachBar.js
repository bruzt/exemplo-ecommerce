import React, { useState } from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import ClickAwayListener from 'react-click-away-listener';
import { useRouter } from 'next/router';

import { useFilterBar } from '../context/filterBarContext';

export default function MenuAndSearchBar() {

    const [getCategoryMenuToggle, setCategoryMenuToggle] = useState(false);

    const router = useRouter();
    const filterBarContext = useFilterBar();

    function categoryMenuToggle() {

        if (getCategoryMenuToggle == true) setCategoryMenuToggle(false);
        else setCategoryMenuToggle(true);
    }

    function categoryMenuClose() {

        setCategoryMenuToggle(false);
    }

    function handleSearch(event) {

        event.preventDefault();

        router.push({
            pathname: '/search',
            query: {
                title: filterBarContext.getSearchBarText
            }
        })
    }

    function categoryTree(){

        const firstLevels = filterBarContext.getCategories.filter(item => !item.parent);

        return (
            <>
                {firstLevels.map( (firstLevel) => buildCategoryTree(firstLevel))}
            </>
        );
    }

    function buildCategoryTree(category){

        const children = filterBarContext.getCategories.filter(child => child.parent == category.id)

        let hasChildren = false;

        if (children.length > 0) hasChildren = true;

        return (
            <li 
                key={category.id} 
                className={`${(hasChildren) ? 'has-children' : ''}`} 
                onClick={(event) => handleCategorySearch(event, category)}
            >
                {category.name}
                {(hasChildren) && (
                    <ul>
                        {children.map( (child) => buildCategoryTree(child))}
                    </ul>
                )}
            </li>
        );
    }

    function handleCategorySearch(event, category){

        event.stopPropagation();

        if(event.target.classList.contains('has-children')){

            event.target.classList.toggle('open');
            
            //return; 
        }

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

                    <ClickAwayListener onClickAway={categoryMenuClose}>
                        <button className="dropbtn" onClick={categoryMenuToggle}>
                            Categorias <FaCaretDown />
                        </button>
                        <div className={`dropdown-content ${(getCategoryMenuToggle) ? 'toggle' : ''}`}>
                            <ul>
                                {categoryTree()}
                            </ul>
                        </div>
                    </ClickAwayListener>

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

                .dropbtn {
                    height: 100%;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    color: inherit;
                    font-size: 20px;
                    padding: 10px 0;
                }

                .dropbtn:hover + .dropdown-content {
                    display: block;
                }

                .dropdown-content:hover {
                    display: block;
                }

                .dropdown-content.toggle {
                    display: block;
                }

                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: #0D2235;
                    min-width: 160px;
                    z-index: 10;
                    padding: 10px;
                }

                .dropdown-content li {
                    float: none;
                    color: black;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                    text-align: left;
                }

                .dropdown-content ul {
                    padding-left: 16px;
                }

                .dropdown-content li {
                    list-style: none;
                    margin-top: 2px;
                }

                .dropdown-content li.has-children {
                    cursor: pointer;
                    position: relative;
                }

                .dropdown-content li.has-children:before {
                    content: '\f107';
                    color: #F3F3F4;
                    position: absolute;
                    /*font-family: FontAwesome;*/
                    font-size: 26px;
                    right: 15px;
                }

                .dropdown-content li > ul {
                    display: none;
                }

                .dropdown-content li.open > ul {
                    display: block;
                } 

                nav form {
                    display: flex;
                    justify-content: center;
                }

                nav form input {
                    width: 400px;
                    height: 40px;
                    padding: 5px;
                    border: none;
                    font-size: 20px;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                nav form button {
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
