# This is my personal API

.env

```
ADMIN_KEY=""
MONGO_USER=""
MONGO_PASS=""
MONGO_URL=""
NYT_API_KEY=""
UNSPLASH_ACCESS=""
UNSPLASH_SECRET=""
```

## Endpoints

| Protected | Method | Path                | Description                                        |
| --------- | ------ | ------------------- | -------------------------------------------------- |
| N         | GET    | /                   | Sends the default message to the user              |
| (Y)       | GET    | /admin              | Displays the admin dashboard                       |
| N         | GET    | /news               | Fetches the most recent headlines from the NYT API |
| N         | GET    | /background         | Returns a list of all saved images                 |
| Y         | POST   | /background/new     | Fetches a new background from Unsplash             |
| N         | GET    | /background/random  | Returns the data for a random saved image          |
| N         | GET    | /background/id/<id> | Fetches an images' data from Unsplash by id        |
| Y         | POST   | /background/save    | Saves a specific image to the DB given its id      |
