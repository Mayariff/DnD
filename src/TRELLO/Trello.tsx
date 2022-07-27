import React, {useState} from 'react';
import s from './Trello.module.css'
import {log} from "util";


const Trello = () => {

    const [boards, setBoards] = useState(
        [
            {id: 11, title: 'Сделать', items: [{id: 1, title: 'Пойти в магаз'}]},
            {id: 12, title: 'Проверить', items: [{id: 2, title: 'Код ревью'}, {id: 3, title: 'Тестовое'}]},
            {id: 13, title: 'Сделано', items: [{id: 4, title: 'Поесть'}, {id: 5, title: 'Посмотреть сериал'}]}
        ]
    )

    const [currentBoard, setCurrentBoard] =useState<any>(null)
    const [currentItem, setCurrentItem] =useState<any>(null)

    //сработывает, когда мы взяли таску. Здесь сохраняем таску, которую взяли и доску из которой ее взяли
    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board:any, item: any) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    //если мы отпустили перемещение
    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
     e.currentTarget.style.boxShadow='none'
    }

    // если находимся над др доской
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        if(e.currentTarget.classList.contains("Trello_item__7ZCOw")){
            e.currentTarget.style.boxShadow='0 2px 3px gray'
        }

    }

    // отпустили карточку и рассчитываем, что произойдет др действие/ что произойдет, когда мы отпустили карточку на новую доску
    function dropHandler(e: React.DragEvent<HTMLDivElement>,board:any, item: any) {
        e.preventDefault()
            //индекс в массиве у карточи, которую мы держим "в руке"
        const currentIndex =  currentBoard.items.indexOf(currentItem)
        //удаляем этот  элемент из текущей доски
        currentBoard.items.splice(currentIndex,1)
       // индекс таски вместо которой дропаем новую
        const dropIndex =  board.items.indexOf(item)
        //вставляем новую таску после элемента, над которым она висела
        board.items.splice(dropIndex+1,0,currentItem)

            //перерисовываем доски
            //итерируемся по всем доскам. меняем старые на новые (включая и ту, что в сет стейте
        // @ts-ignore
        setBoards(boards.map(b=> {
            // @ts-ignore
            if(b?.id && b.id === board.id)  {
                return board
            }
            // @ts-ignore
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.currentTarget.style.boxShadow='none'
    }
    //сработывает, если мы вышли за пределы доски
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow='none'
    }
//чтоб добавлять в пустую доску
    function dropBordHandler(e: React.DragEvent<HTMLDivElement>, board: any) {
        if(board.items.length<1){
        board.items.push(currentItem)
        const currentIndex =  currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex,1)
        // @ts-ignore
        setBoards(boards.map(b=> {
            // @ts-ignore
            if(b?.id && b.id === board.id)  {
                return board
            }
            // @ts-ignore
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        }
        e.currentTarget.style.boxShadow='none'
    }

    return (
        <>
            {boards.map(b => {
                return (<div className={s.board} key={b.id}
                    onDragOver={(e)=>dragOverHandler(e)}
                             onDrop={(e)=>dropBordHandler(e, b)}
                    >
                        <div className={s.boardTitle}> {b.title}</div>
                        {b.items.map(i => <div className={s.item} key={i.id}
                                               draggable={true}
                                               onDragStart={(e) => dragStartHandler(e, b, i)}
                                               onDragLeave={(e) => dragLeaveHandler(e)}
                                               onDragEnd={(e) => dragEndHandler(e)}
                                               onDragOver={(e) => dragOverHandler(e)}
                                               onDrop={(e) => dropHandler(e, b, i)}
                        >
                            {i.title} </div>)}
                    </div>
                )
            })
            }

        </>
    );
};

export default Trello;