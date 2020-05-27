import React, { useState, memo } from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import ClickAwayListener from 'react-click-away-listener';
import { useRouter } from 'next/router';

export default memo( function MenuAndSearchBar() {

    const [getCategoryMenuToggle, setCategoryMenuToggle] = useState(false);
    const [getSearchBarText, setSearchBarText] = useState('');

    const router = useRouter();

    function categoryMenuToggle(){

        if(getCategoryMenuToggle == true) setCategoryMenuToggle(false);
        else setCategoryMenuToggle(true);
    }

    function categoryMenuClose(){

        setCategoryMenuToggle(false);
    }

    function handleSearch(event){

        event.preventDefault();

        router.push({
            pathname: '/search',
            query: {
                title: getSearchBarText
            }
        })
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
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </ClickAwayListener>

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder='Pesquise o seu produto'
                            value={getSearchBarText}
                            onChange={(event) => setSearchBarText(event.target.value)}
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

                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: #eee;
                    min-width: 160px;
                    z-index: 10;
                }

                .dropdown-content a {
                    float: none;
                    color: black;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                    text-align: left;
                }

                .dropdown-content:hover {
                    display: block;
                }

                .dropdown-content.toggle {
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
})
