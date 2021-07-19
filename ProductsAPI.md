# Products API

## GET /

Retrieves all the available products, limited to five

###### Response

`Status: 200 OK`

```
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    },
    {
        "id": 4,
        "name": "Slacker's Slacks",
        "slogan": "Comfortable for everything, or nothing",
        "description": "I'll tell you how great they are after I nap for a bit.",
        "category": "Pants",
        "default_price": 65
    },
    {
        "id": 5,
        "name": "Heir Force Ones",
        "slogan": "A sneaker dynasty",
        "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        "category": "Kicks",
        "default_price": 99
    }
]
```

## GET /:product_id

Retrieves product information for specified product

###### Parameters

| Parameter  | Type    | Description   |
| ---------- | ------- | ------------- |
| product_id | integer | id of product |

###### Response

`Status: 200 OK`

```
{
    "id": 12849,
    "name": "The Laney Jacket",
    "slogan": "Optio sequi quia.",
    "description": "Aliquam et expedita sapiente non. Modi nesciunt nulla blanditiis officia rerum sunt assumenda aliquid. Ea modi nihil illo fuga dignissimos. Similique vel voluptas voluptatem accusamus architecto. Ab culpa saepe rerum nesciunt perspiciatis optio sunt dolorem. Excepturi harum doloremque dolorem sapiente.",
    "category": "Jacket",
    "default_price": 223,
    "features": [
        {
            "feature": "Lifetime Guarantee",
            "value": "null"
        },
        {
            "feature": "Frame",
            "value": "AllLight Composition Resin"
        },
        {
            "feature": "Non-GMO",
            "value": "null"
        }
    ]
}
```

## GET /:product_id/styles

Retrieves style information for specified product

###### Parameters

| Parameter  | Type    | Description   |
| ---------- | ------- | ------------- |
| product_id | integer | id of product |

###### Response

`Status: 200 OK`

```
{
    "product_id": "12849",
    "results": [
        {
            "style_id": 60032,
            "name": "Green",
            "sale_price": null,
            "original_price": 223,
            "default?": true,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1531889947080-bc5693ae9fa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1554921148-83d8ceda2095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1554136920-a1df2909d8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            "skus": {
                "348217": {
                    "size": "XS",
                    "quantity": 50
                },
                "348218": {
                    "size": "S",
                    "quantity": 38
                },
                "348219": {
                    "size": "M",
                    "quantity": 12
                },
                "348220": {
                    "size": "L",
                    "quantity": 10
                },
                "348221": {
                    "size": "XL",
                    "quantity": 29
                },
                "348222": {
                    "size": "XXL",
                    "quantity": 23
                }
            }
        },
        ...
    ]
}
```

## GET /:product_id/related

Retrieves product ids of related products to specified product

###### Parameters

| Parameter  | Type    | Description   |
| ---------- | ------- | ------------- |
| product_id | integer | id of product |

###### Response

`Status: 200 OK`

```
[
    1,
    2,
    3,
    4
]
```
