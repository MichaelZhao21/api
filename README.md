# This is my personal API

.env

```
ADMIN_KEY=""
MONGO_USER=""
MONGO_PASS=""
MONGO_URL=""
```

## Endpoints

| Protected | Method | Path                | Description                                                                 |
| --------- | ------ | ------------------- | --------------------------------------------------------------------------- |
| N         | GET    | /                   | Sends the default message to the user                                       |
| Y         | GET    | /admin              | Displays the admin dashboard                                                |
| N         | GET    | /news               | Fetches the most recent headlines from the [News API](https://newsapi.org/) |
| N         | GET    | /pin/<user>/<board> | Gets one of the last 50 pins randomly from a given board                    |
