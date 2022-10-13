export const createDropdownMenu = (categories) => {
    if (categories == undefined ) {
        return null;
    }
    
    let html = `<div class="dropdown-menu" aria-labelledby="navbarDropdown">`;
    for (const category of categories) {
        html += `<a class="dropdown-item" href="/categories/${encodeURIComponent(category.name)}">${category.name}</a>`;
    }
    html += `</div>`;
    return html;
};