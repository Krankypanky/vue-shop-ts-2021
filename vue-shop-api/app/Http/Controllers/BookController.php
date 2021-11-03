<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Book::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $book = [
            "title" => $request["title"],
            "description" => $request["description"],
            "subtitle" => $request["subtitle"],
            "image" => $request["image"],
            "price" => $request["price"],
            "pages" => $request["pages"],
            "author" => $request["author"],
            "published" => $request["published"],
            "publisher" => $request["publisher"],
            "isbn" => $request["isbn"],
            "website" => $request["website"]
        ];

        $rules = [
            'title'        => 'required|string|max:255|min:2',
            'isbn'  => 'required|string|max:255|min:2',
            'subtitle'   => 'required|string|max:255|min:2',
            'author'  => 'required|string|max:255|min:2',
            "description" => 'required|string|max:255|min:2',
            "image" => "required|max:10000|mimes:gif,png,jpg,jpeg",
            "price" => 'required|int|min:0',
            "pages" => 'required|int|min:0',
            "published" => 'required|date',
            "publisher" => 'required|string|max:255|min:2',
            "website" => 'required|url|max:255|min:2'
        ];

        $validation = Validator::make($book, $rules);

        // throw exception if the validation fails
        if ($validation->fails()) {
            throw new ValidationException($validation);
        }

        $path = $book["image"]->store('books', "public");
        $book["image"] = $path;

        return Book::create($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @param  string $id
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book, $id)
    {
        return $book->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
