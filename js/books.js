let view = 'list';
let books = [];

//vzima knigite ot servera
function getBooks(params = {}) {
    const data = { ...params }
    $.ajax({
        method: "GET",
        url: `https://6195633d74c1bd00176c6d37.mockapi.io/Books`,
        data,
    })
        .done(response => {
            books = response;
            showBooks();
        })
        .fail(response => {
            console.log('fail', response);
        })
        .always(() => {
            console.log('ajax completed');
        })
}

//pokazva knigite
function showBooks() {
    $bookList = $('#book-list');
    $bookList.empty();
    books.forEach(book => {
        const $template = getBookTemplate(book);
        $bookList.append($template);
    })
}

//slaga zaglavie,avtor,gnr i taka naatatuk po mestata im
function getBookTemplate(book) {
    const templateSelector = `#book-${view}-template`;
    const $template = $($(templateSelector).html());
    const image = `${book.url}`;
    $template.find('.book-poster').attr('src', image);
    $template.find('.title').text(book.title);
    $template.find('.author').text(book.author);
    $template.find('.genre').text(book.genre);
    $template.find('.pages ').text(book.pages);
    $template.find('.description').text(book.description);
    $template.find('.type').text(book.type);
    return $template;
}

//sortiraneto
function getBookParams() {
    const genres = [];
    $('.genre-checkbox:checked').each((index, el) => {
        genres.push(el.value);
    })
    const sortBy = $('#filter-sort').val();
    const params = {
        filter: genres.join(), sortBy: sortBy
    }
    return params;
}

$('#get-books').click(() => {
    getBooks(this.getBookParams());
})

//otvarq ediniq izgled
$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    showBooks();
})

//otvarq drugiq izgled
$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    showBooks();
})

getBooks(this.getBookParams());