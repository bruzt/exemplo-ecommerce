import React, { FormEvent, useEffect, useState } from "react";
import { FaCaretDown, FaCaretRight, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Switch from "react-switch";
import { FiSun, FiMoon } from "react-icons/fi";

import api from "../../../services/api";
import { ICategory, useFilterBar } from "../../../contexts/filterBarContext";
import { useTheme } from "../../../contexts/themeContext";
import { IProduct } from "../../../pages/product/[productId]";
import MobileMenu from "../MobileMenu";

import { Container, CategoryDropdownMenu, SearchBarForm } from "./styles";

let timeoutId: NodeJS.Timeout;
//let firstRender = true;

export default function CategoriesAndSeachBar() {
  const [getActiveCategoryMenu, setActiveCategoryMenu] = useState(false);

  const [getProducts, setProducts] = useState<IProduct[]>([]);

  const [getMobileMenuActive, setMobileMenuActive] = useState(false);

  const router = useRouter();
  const filterBarContext = useFilterBar();
  const themeContext = useTheme();

  /*useEffect( () => {
        return () => { firstRender = true; }
    }, []);

    useEffect( () => {
        if(firstRender === false) {
            debounceFetchSearchProducts();
        }
        else firstRender = false;

    }, [filterBarContext.getSearchBarText]);*/

  useEffect(() => {
    if (process.browser) {
      const body = document.getElementById("root");

      if (getMobileMenuActive) body.style.overflow = "hidden";
      else body.style.overflow = "initial";
    }
  }, [getMobileMenuActive]);

  function debounceFetchSearchProducts(productTitle: string) {
    filterBarContext.setSearchBarText(productTitle);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        if (filterBarContext.getSearchBarText.length > 2) {
          const response = await api.get(
            `/products?limit=5&title=${filterBarContext.getSearchBarText}`
          );

          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar produtos");
      }
    }, 500);
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    clearTimeout(timeoutId);
    setProducts([]);

    if (String(filterBarContext.getSearchBarText).length > 0) {
      setMobileMenuActive(false);

      delete router.query.categoryId;
      delete router.query.category;

      router.push({
        pathname: "/search",
        query: {
          ...router.query,
          page: 1,
          title: filterBarContext.getSearchBarText,
        },
      });
    }
  }

  function handleCategorySearch(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    category: ICategory
  ) {
    event.stopPropagation();

    setActiveCategoryMenu(false);

    delete router.query.title;

    router.push({
      pathname: "/search",
      query: {
        ...router.query,
        categoryId: category.id,
        page: 1,
        category: String(category.name).split(" ").join("-"),
      },
    });
  }

  function handleChangeTheme(checked: boolean) {
    if (checked) themeContext.changeThemeTo("light");
    else themeContext.changeThemeTo("dark");
  }

  function categoryTree() {
    const firstLevels = filterBarContext.getCategories.filter(
      (item) => !item.parent_id
    );

    return (
      <CategoryDropdownMenu>
        <ClickAwayListener onClickAway={() => setActiveCategoryMenu(false)}>
          <ul>
            <li
              className={`category-menu ${
                getActiveCategoryMenu ? "active" : ""
              }`}
              onClick={() => setActiveCategoryMenu(!getActiveCategoryMenu)}
              data-testid="category-menu"
            >
              <p>
                Categorias <FaCaretDown />
              </p>
              <ul data-testid="first-level-categories">
                {firstLevels.map((firstLevel) => buildCategoryTree(firstLevel))}
              </ul>
            </li>
          </ul>
        </ClickAwayListener>
      </CategoryDropdownMenu>
    );
  }

  function buildCategoryTree(category: ICategory) {
    const children = filterBarContext.getCategories.filter(
      (child) => child.parent_id == category.id
    );

    let hasChildren = false;

    if (children.length > 0) hasChildren = true;

    return (
      <li
        key={category.id}
        className={`${hasChildren ? "has-children" : ""}`}
        onClick={(event) => handleCategorySearch(event, category)}
        data-testid="category-children"
      >
        <p>
          {category.name} {hasChildren && <FaCaretRight />}
        </p>
        {hasChildren && (
          <ul>{children.map((child) => buildCategoryTree(child))}</ul>
        )}
      </li>
    );
  }

  function SearchBar() {
    return (
      <SearchBarForm onSubmit={handleSearch}>
        <div>
          <input
            type="text"
            data-testid="search-bar"
            placeholder="Pesquise o seu produto"
            value={filterBarContext.getSearchBarText}
            onChange={(event) =>
              debounceFetchSearchProducts(event.target.value)
            }
          />
          <button type="submit" data-testid="search-bar-button">
            <FaSearch />
          </button>
        </div>

        <ClickAwayListener onClickAway={() => setProducts([])}>
          <ul className="dropdown-search">
            {getProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/${product.id}?product=${String(product.title)
                    .split(" ")
                    .join("-")}`}
                >
                  <a onClick={() => setMobileMenuActive(false)}>
                    <div className="img-container">
                      {product.images.length > 0 ? (
                        <img
                          src={`${process.env.BACKEND_URL}/uploads/${product.images[0].filename}`}
                          alt={product.title}
                        />
                      ) : (
                        <img src="/images/img-n-disp.png" alt="sem imagem" />
                      )}
                    </div>
                    <span className="title">{product.title}</span>
                    <span className="price">
                      <span>R$&nbsp;</span>
                      {product.finalPrice}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      </SearchBarForm>
    );
  }

  return (
    <Container>
      {getMobileMenuActive && (
        <MobileMenu
          setMobileMenuActive={setMobileMenuActive}
          searchBar={SearchBar}
        />
      )}

      <div className="limit-center">
        <div className="category-and-searchbar">
          {categoryTree()}

          {SearchBar()}

          <span></span>
        </div>

        <div
          className="switch-container"
          title={
            themeContext.getTheme.title === "dark"
              ? "Tema: Escuro"
              : "Tema: Claro"
          }
        >
          <Switch
            id="react-switch"
            data-testid="theme-switch"
            onChange={handleChangeTheme}
            checked={themeContext.getTheme.title === "light"}
            checkedIcon={<FiSun size={20} color="#16324C" />}
            uncheckedIcon={<FiMoon size={20} />}
            offColor="#444"
            onColor="#ddd"
          />
        </div>

        <div className="mobile-menu">
          <button type="button" onClick={() => setMobileMenuActive(true)}>
            <FaBars size={30} />
          </button>
        </div>
      </div>
    </Container>
  );
}
