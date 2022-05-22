import express from 'express';
import fetch from 'node-fetch';

import Board from '../models/board';
import BoardInfo from '../models/board-info';
import { isAuth } from '../util';

const router = express.Router();

router.get('/:user/:boardName', async function (req, res, next) {
    // Concat board name
    const board = `${req.params.user}/${req.params.boardName}`;

    // Check pinterest to make sure the board exists
    const page = await fetch(`https://www.pinterest.com/${board}`).then((res) => res.text());
    const matches = page.match(/<div data-test-id="pin-count" .*?>((?:\d+,*)+).*?Pins<\/div>/);
    if (matches === null) {
        res.status(404);
        res.send({ status: 404, message: 'Board not found', boardName: board });
        return;
    }

    const op = {
        options: {
            board_id: board,
            currentFilter: -1,
            field_set_key: 'react_grid_pin',
            filter_section_pins: true,
            sort: 'default',
            layout: 'default',
            page_size: 50,
            redux_normalize_feed: true,
            no_fetch_context_on_resource: true,
        },
    };
    const queryData = '?data=' + encodeURIComponent(JSON.stringify(op));

    const data = await fetch(
        `https://www.pinterest.com/resource/BoardFeedResource/get/${queryData}`
    ).then((res) => res.json());

    const pins = data.resource_response.data
        .filter((r) => r.images !== undefined)
        .map((r) => r.images.orig.url.replace(/https:\/\/i.pinimg.com\/originals\/(.*?)/g, '$1'));
    const randPin = pins[Math.floor(Math.random() * pins.length)];
    res.send({
        board: `https://www.pinterest.com/${board}`,
        imgSrc: `https://i.pinimg.com/originals/${randPin}`,
    });
});

// TODO: Doesn't work due to bookmark system not returning next pagination bookmark
// /* /pin */
// router.get('/', async function (req, res, next) {
//     const board = await BoardInfo.find({});
//     const formattedBoard = board.map((b) => ({ name: b['name'], items: b['items'] }));
//     res.send(formattedBoard);
// });

// /* /pin/<user>/<board> */
// router.get('/:user/:boardName', async function (req, res, next) {
//     // Concat board name
//     const boardName = `${req.params.user}/${req.params.boardName}`;

//     // Get board from database and check to see if exists
//     const boardList = await Board.find({ name: boardName }).limit(1);

//     if (boardList.length === 0) {
//         res.sendStatus(404);
//         return;
//     }

//     const pins = boardList[0]['pins'];
//     if (pins.length === 0) {
//         res.sendStatus(404);
//         return;
//     }

//     const randPin = pins[Math.floor(Math.random() * pins.length)];
//     res.send({
//         board: `https://www.pinterest.com/${boardName}`,
//         imgSrc: `https://i.pinimg.com/originals/${randPin}`,
//     });
// });

// /* /pin/<user>/<board> */
// router.post('/:user/:boardName', async function (req, res, next) {
//     // Check for authentication
//     if (!isAuth(req)) {
//         res.sendStatus(403);
//         return;
//     }

//     // Concat board name
//     const board = `${req.params.user}/${req.params.boardName}`;

//     // Get board from database and check to see if already indexing
//     const boardList = await BoardInfo.find({ name: board }).limit(1);
//     if (boardList.length !== 0 && boardList[0]['busy']) {
//         res.status(423);
//         res.send({ status: 423, message: 'Board indexing already in progress!' });
//         return;
//     }

//     // Check pinterest to make sure the board exists
//     const page = await fetch(`https://www.pinterest.com/${board}`).then((res) => res.text());
//     const matches = page.match(/<div data-test-id="pin-count" .*?>((?:\d+,*)+).*?Pins<\/div>/);
//     if (matches === null) {
//         res.status(404);
//         res.send({ status: 404, message: 'Board not found', boardName: board });
//         return;
//     }

//     // Get number of matches
//     const num = Number(matches[1].replace(/\,/g, ''));

//     // Set boardinfo status
//     const boardInfoRes = await BoardInfo.updateOne(
//         { name: board },
//         { $set: { name: board, items: num, busy: true } },
//         { upsert: true }
//     );
//     if (boardInfoRes.n === 0) {
//         res.status(500);
//         res.send({ status: 500, message: 'Unable to update database with info' });
//         return;
//     }

//     // Send message to start fetching
//     res.send({
//         pinCount: num,
//         boardUrl: `https://www.pinterest.com/${board}`,
//     });

//     // Start fetching all the pins from the board
//     let bookmark = null;
//     let count = 0;
//     let op = {
//         options: {
//             board_id: board,
//             currentFilter: -1,
//             field_set_key: 'react_grid_pin',
//             filter_section_pins: true,
//             sort: 'default',
//             layout: 'default',
//             page_size: 25,
//             redux_normalize_feed: true,
//             no_fetch_context_on_resource: true,
//             bookmarks: [null],
//         },
//     };
//     let pinList = [];

//     while (count < num) {
//         op['bookmarks'] = [bookmark];
//         const queryData = '?data=' + encodeURIComponent(JSON.stringify(op));

//         const data = await fetch(
//             `https://www.pinterest.com/resource/BoardFeedResource/get/${queryData}`
//         ).then((res) => res.json());

//         // console.log(data.resource_response.data);

//         const pins = data.resource_response.data
//             .filter((r) => r.images !== undefined)
//             .map((r) =>
//                 r.images.orig.url.replace(/https:\/\/i.pinimg.com\/originals\/(.*?)/g, '$1')
//             );
//         pinList = pinList.concat(pins);

//         bookmark = data.resource_response.bookmark;
//         count += 25;
//         console.log(`Board indexing: ${board} | ${pinList.length}/${num}`);
//     }

//     // Set board object and boardinfo status
//     await Board.updateOne(
//         { name: board },
//         { $set: { name: board, pins: pinList } },
//         { upsert: true }
//     );
//     await BoardInfo.updateOne(
//         { name: board },
//         { $set: { name: board, items: pinList.length, busy: false } }
//     );
// });

export default router;
