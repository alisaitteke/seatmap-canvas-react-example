import './App.css';
import {Seatmap} from '@alisaitteke/seatmap-canvas-react';
import React from 'react'

function App() {

    // CREATE 4 DUMMY BLOCKS
    const seatmapRef = React.createRef();
    const generateDummySeats = () => {
        let block_colors = ["#01a5ff", "#fccf4e", "#01a5ff", "#01a5ff"];
        let blocks = []
        let last_x = 0;
        for (let j = 0; j < 4; j++) { // blocks

            let color = block_colors[j];

            let seats = []
            let cell_count = 0;
            let row_count = 0;
            let block_final_x = 0;
            let randomSeatCount = Math.round((Math.random() * (Math.abs(400 - 200))) + 200)
            let randomCell = Math.round((Math.random() * (Math.abs(28 - 12))) + 12)

            for (let k = 0; k < randomSeatCount; k++) { // row

                if (k % randomCell === 0) {
                    cell_count = 1;
                    row_count++;
                }

                let x = (cell_count * 33) + last_x;
                let y = row_count * 30;

                if (block_final_x < x) block_final_x = x;


                let salable = Math.ceil(Math.random() * 10) > 3;

                let seat = {
                    id: `s-${k}`,
                    x: x,
                    y: y,
                    color: color, // can use item.color from json data
                    salable: salable,
                    custom_data: {any: "things"},
                    note: "note test",
                    tags: {},
                    title: `Title ${cell_count} ${row_count}`,
                }
                cell_count++;

                // @ts-ignore
                seats.push(seat)
            }

            last_x = block_final_x + 100;

            let block = {
                "id": `block-${j}`,
                "title": `Block - ${j + 1}`,
                "labels": [],
                "color": color,
                "seats": seats
            };

            // @ts-ignore
            blocks.push(block);
        }

        return blocks;
    }
    let blocks = generateDummySeats()
    const config = {
        legend: true,
        style: {
            seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                check_icon_color: '#fff',
                not_salable: '#0088d3',
                focus: '#8fe100',
            },
            legend: {
                font_color: '#3b3b3b',
                show: false
            },
            block: {
                title_color: '#fff'
            }
        }
    }

    const seatClick = (seat) => {
        console.log(seat)
        if (!seat.isSelected() && seat.item.salable === true) {
            seat.select()
        } else {
            seat.unSelect()
        }
    }

    // const getSelectedSeats = () => {
    //     const selectedSeats = seatmapRef.current.getSelectedSeats()
    //     console.log('selectedSeats', selectedSeats)
    // }

    const zoomToBlock = (blockId) => {
        seatmapRef.current.zoomManager.zoomToBlock(blockId)
    }

    const zoomToVenue = () => {
        seatmapRef.current.zoomToVenue()
    }
    const randomize = () => {
        blocks = generateDummySeats()
        seatmapRef.current.replaceData(blocks)
    }

    return (
        <div className="absolute flex flex-col w-screen h-screen">
            <div className="bg-[#ab1f34] flex justify-center border-b border-[#d05063]">
                <img className="h-11 py-1" src="logo_small.jpg"/>
                <div className="absolute h-12 right-3 flex flex-row gap-3 items-center content-center">
                    <a className="github-button" href="https://github.com/alisaitteke/seatmap-canvas/subscription"
                       data-icon="octicon-eye" aria-label="Watch alisaitteke/seatmap-canvas on GitHub">Watch</a>
                    <a className="github-button" href="https://github.com/alisaitteke"
                       aria-label="Follow @alisaitteke on GitHub">Follow @alisaitteke</a>
                    <a className="github-button" href="https://github.com/alisaitteke/seatmap-canvas/fork"
                       data-icon="octicon-repo-forked" aria-label="Fork alisaitteke/seatmap-canvas on GitHub">Fork</a>
                </div>
            </div>
            <div className="flex flex-row h-full">
                <div className="w-48 bg-gray-100 hidden md:block border-r border-r-gray-300 shadow-lg">
                    <div className="flex flex-col gap-3 p-1.5 text-xs">
                        <button
                            onClick={zoomToVenue}
                            className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200"
                            id="zoomout-button">
                            <i className="fa-solid fa-magnifying-glass-minus mr-2"></i>
                            All Blocks
                        </button>
                        <button
                            className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200"
                            id="get-selected-seats">
                            <i className="fa-solid fa-code mr-2"></i>
                            Get Json
                        </button>
                        <button onClick={(e) => zoomToBlock('block-0')}
                                className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200 zoom-to-block"
                                data-block-id="block-0">
                            <i className="fa-solid fa-magnifying-glass-plus mr-2"></i>
                            Zoom Block 1
                        </button>
                        <button onClick={(e) => zoomToBlock('block-1')}
                                className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1  px-3 rounded-md hover:bg-slate-200 zoom-to-block"
                                data-block-id="block-1">
                            <i className="fa-solid fa-magnifying-glass-plus mr-2"></i>
                            Zoom Block 2
                        </button>
                        <button onClick={(e) => zoomToBlock('block-2')}
                                className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1  px-3 rounded-md hover:bg-slate-200 zoom-to-block"
                                data-block-id="block-2">
                            <i className="fa-solid fa-magnifying-glass-plus mr-2"></i>
                            Zoom Block 3
                        </button>
                        <button onClick={(e) => zoomToBlock('block-3')}
                                className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1  px-3 rounded-md hover:bg-slate-200 zoom-to-block"
                                data-block-id="block-3">
                            <i className="fa-solid fa-magnifying-glass-plus mr-2"></i>
                            Zoom Block 4
                        </button>
                        <button
                            onClick={randomize}
                            className="border text-left border-slate-500 bg-slate-100 text-slate-800 py-1  px-3 rounded-md hover:bg-slate-200"
                            id="randomize-btn"
                            data-block-id="block-2">
                            <i className="fa-solid fa-magnifying-glass-plus mr-2"></i>
                            Randomize
                        </button>
                    </div>
                </div>
                <Seatmap className="w-full flex-1 h-full" ref={seatmapRef} seatClick={seatClick} blocks={blocks}
                         config={config}></Seatmap>
            </div>
        </div>
    );
}

export default App;
