import React, { FormEvent, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ClickAwayListener from 'react-click-away-listener';
import Link from 'next/link';

import api from '../../../services/api';

import { ICategory, useFilterBar } from '../../../contexts/filterBarContext';
import { IProduct } from '../../../pages/[productId]';

import noImage from '../../../assets/img-n-disp.png';

import { Container, CategoryDropdownMenu } from './styles';

let timeoutId: number;
let firstRender = true;

export default function CategoriesAndSeachBar() {
    
    const [getActiveCategoryMenu, setActiveCategoryMenu] = useState(false);

    const [getProducts, setProducts] = useState<IProduct[]>([]);

    const router = useRouter();
    const filterBarContext = useFilterBar();

    useEffect( () => {
        return () => firstRender = true;
    }, []);

    useEffect( () => {
        if(firstRender === false) {
            debounceFetchSearchProducts();
        }
        else firstRender = false;

    }, [filterBarContext.getSearchBarText]);

    function debounceFetchSearchProducts(){

        clearTimeout(timeoutId);

        timeoutId = setTimeout( async () => {
            try {

                if(filterBarContext.getSearchBarText.length > 0){

                    const response = await api.get(`/products?limit=5&title=${filterBarContext.getSearchBarText}`);
    
                    setProducts(response.data.products);

                } else {
                    setProducts([]);
                }
                
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar produtos');
            }
        }, 500);
    }

    function handleSearch(event: FormEvent) {

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

    function handleCategorySearch(event: React.MouseEvent<HTMLLIElement, MouseEvent>, category: ICategory){

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
                        <div>
                            <input
                                type="text"
                                placeholder='Pesquise o seu produto'
                                value={filterBarContext.getSearchBarText}
                                onChange={(event) => filterBarContext.setSearchBarText(event.target.value)}
                            />
                            <button type='submit'>
                                <FaSearch />
                            </button>
                        </div>

                        <ClickAwayListener onClickAway={() => setProducts([])}>
                            <ul className="dropdown-search">
                                {getProducts.map( (product) => (
                                    <li key={product.id}>
                                        <Link href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                                            <a>
                                                <div className="img-container">
                                                        {product.images.length > 0
                                                            ? (
                                                                <img 
                                                                    src={`${process.env.BACKEND_URL}/uploads/${product.images[0].filename}`} 
                                                                    alt={product.title} 
                                                                />
                                                            ) : (
                                                                <img 
                                                                    src={noImage} 
                                                                    alt='sem imagem' 
                                                                />
                                                            )
                                                        }  
                                                </div>
                                                <span className='title'>{product.title}</span>
                                                <span className='price'><span>R$&nbsp;</span>{product.price}</span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </ClickAwayListener>
                    </form>

                    <span></span>
                </div>
            </nav>
        </Container>
    );
}
