<?php
/**
 * @return array
 */
function getPokemonNames()
{
    return [
        [
            "id" => 1,
            "name" => "Bullbasaur",
            "number" => 001,
            "image" => "https://img.pokemondb.net/artwork/bulbasaur.jpg",
//            "type" => "Grass - Poison",
//            "japaneseName" => ['フシギダネ'],
        ],
        [
            "id" => 2,
            "name" => "Charmander",
            "number" => "004",
            "image" => "https://img.pokemondb.net/artwork/charmander.jpg",
//            "type" => "Fire",
//            "japaneseName" => ['ヒトカゲ	'],
        ],
        [
            "id" => 3,
            "name" => "Squirtle",
            "number" => "007",
            "image" => "https://img.pokemondb.net/artwork/squirtle.jpg",
//            "type" => "Water",
//            "japaneseName" => ['ゼニガメ'],
        ],
        [
            "id" => 4,
            "name" => "Pikachu",
            "number" => "025",
            "image" => "https://img.pokemondb.net/artwork/pikachu.jpg",
//            "type" => "Electric",
//            "japaneseName" => ['ピカチュウ'],
        ],
        [
            "id" => 5,
            "name" => "Snorlax",
            "number" => "143",
            "image" => "https://img.pokemondb.net/artwork/snorlax.jpg",
//            "type" => "Normal",
//            "japaneseName" => ['カビゴン'],
        ],
        [
            "id" => 6,
            "name" => "Aerodactyl",
            "number" => "142",
            "image" => "https://img.pokemondb.net/artwork/aerodactyl.jpg",
//            "type" => "Rock - Flying",
//            "japaneseName" => ['プテラ'],
        ],
        [
            "id" => 7,
            "name" => "Articuno",
            "number" => "144",
            "image" => "https://img.pokemondb.net/artwork/articuno.jpg",
//            "type" => "Ice - Flying",
//            "japaneseName" => ['フリーザー'],
        ],
        [
            "id" => 8,
            "name" => "Zapdos",
            "number" => "145",
            "image" => "https://img.pokemondb.net/artwork/zapdos.jpg",
//            "type" => "Electric - Flying",
//            "japaneseName" => ['サンダー'],
        ],
        [
            "id" => 9,
            "name" => "Moltres",
            "number" => "146",
            "image" => "https://img.pokemondb.net/artwork/moltres.jpg",
//            "type" => "Fire - Flying",
//            "japaneseName" => ['ファイヤー'],
        ],
        [
            "id" => 10,
            "name" => "Mewtwo",
            "number" => "150",
            "image" => "https://img.pokemondb.net/artwork/mewtwo.jpg",
//            "type" => "Psychic",
//            "japaneseName" => ['ミュウツー'],

        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getPokemonDetails($id)
{
    $tags = [
        1 => [
            "type" => "Grass - Poison",
            "japaneseName" => 'フシギダネ',
        ],
        2 => [
            "type" => "Fire",
            "japaneseName" => 'ヒトカゲ',
        ],
        3 => [
            "type" => "Water",
            "japaneseName" => 'ゼニガメ',
        ],
        4 => [
            "type" => "Electric",
            "japaneseName" => 'ピカチュウ',
        ],
        5 => [
            "type" => "Normal",
            "japaneseName" => 'カビゴン'
        ],
        6 => [
            "type" => "Rock - Flying",
            "japaneseName" => 'プテラ',
        ],
        7 => [
            "type" => "Ice - Flying",
            "japaneseName" => 'フリーザー'
        ],
        8 => [
            "type" => "Electric - Flying",
            "japaneseName" => 'サンダー',
        ],
        9 => [
            "type" => "Fire - Flying",
            "japaneseName" => 'ファイヤー',
        ],
        10 => [
            "type" => "Psychic",
            "japaneseName" => 'ミュウツー',
        ],
    ];

    return $tags[$id];
}
