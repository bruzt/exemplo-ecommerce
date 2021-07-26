import React from 'react';
import { FaTimes, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Container } from './styles';

import { useUser } from '../../../contexts/userContext';
import { ICategory, useFilterBar } from '../../../contexts/filterBarContext';

interface IProps {
    setMobileMenuActive: React.Dispatch<boolean>;
    searchBar: () => React.ReactNode;
}

export default function MobileMenu({ setMobileMenuActive, searchBar }: IProps) {

    const userContext = useUser();
    const filterBarContext = useFilterBar();
    const router = useRouter();

    function handleLoginModal(){
        setMobileMenuActive(false);
        userContext.handleSwitchModal();
    }
    
    function handleUserAccount(){
        setMobileMenuActive(false);
        router.push({
            pathname: '/account',
            query: {
                menu: 'account-data'
            }
        });
    }

    function handleUserLogout(){
        setMobileMenuActive(false);
        userContext.logOut()
    }

    function categoryTree(){

        return filterBarContext.getCategories.map( category => {
                        
            if(category.parent_id == null || category.parent_id == 0) {
                return (
                    <details key={category.id}>
                        <summary>{category.name}</summary>
                        {buildCategoryTree(category)}
                    </details>
                );
            }
        });
    }

    function buildCategoryTree(fatherCategory: ICategory){

        const children = filterBarContext.getCategories.filter(child => child.parent_id == fatherCategory.id)

        return children.map( child => {

            const childs = filterBarContext.getCategories.filter( (category) => child.id == category.parent_id);
            let hasChildren = false;
            if (childs.length > 0) hasChildren = true;
            
            if(hasChildren){
                return (
                    <details key={child.id}>
                        <summary>{child.name}</summary>
                        {buildCategoryTree(child)}
                    </details>
                );
            } else {
                return (
                    <details key={child.id}>
                        <summary className='last-child'>
                            <Link href={`${process.env.SITE_DOMAIN}/search?categoryId=${child.id}&category=${child.name}`}>
                                <a onClick={() => setMobileMenuActive(false)}>
                                    <span>{child.name}</span>
                                </a>
                            </Link>
                        </summary>
                    </details>
                );
            }
        });
    }

    return (
        <Container>
            <div className='menu-header'>
                <div className="user-login">
                    {userContext.getLogin
                        ? (
                            <div className='user-menu'>
                                <button 
                                    type='button' 
                                    data-testid='user-account-button' 
                                    onClick={handleUserAccount}
                                >
                                    Conta do usuário
                                </button>
                                <button 
                                    type='button' 
                                    data-testid='user-logout-button' 
                                    onClick={handleUserLogout}
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <button 
                                className='login' 
                                data-testid='login-modal-button' 
                                type='button'
                                onClick={handleLoginModal}
                            >
                                <FaSignInAlt />
                                <span>Entrar</span>
                            </button>
                        )
                    }
                </div>

                <button 
                    id='exit-mobile-menu'
                    data-testid='exit-mobile-menu'
                    type='button'
                    onClick={() => setMobileMenuActive(false)}
                >
                    <FaTimes size={40} />
                </button>
            </div>

            <div className="menu-body">

                {searchBar()}

                <div className="category-menu">
                    {categoryTree()}
                </div>

            </div>

        </Container>
    );
}
