import React, {useState} from 'react';
import s from './SimpleDND.module.css';

type cardType = {
    id: number
    order: number
    text: string
}

function SimpleDNDcards() {

    const [cardList, setCardList] = useState<cardType[]>(
        [
            {id: 1, order: 3, text: 'карточка 3'},
            {id: 2, order: 1, text: 'карточка 1'},
            {id: 3, order: 2, text: 'карточка 2'},
            {id: 4, order: 4, text: 'карточка 4'}]
    )

    //чтобы запомнить взятую карточку для смены мест (карточка, которую мы держим
    const [currenCard, setCurrentCard ] = useState<cardType|null>(null)

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: cardType) {
        setCurrentCard(card)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.backgroundColor = 'white'
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.currentTarget.style.backgroundColor = 'lightgray'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, card: cardType) {
        //card- карточка под которой мы находимся
        // currenCard- карточка, которую мы держим
        // с- просто каждая карточка из первоночального массва карт
        e.preventDefault()
        console.log('drop', card)
        //меняем местами карты
        setCardList(cardList.map(c=> {
                //если текущий эл массива и его id равен карточки, в которую мы закидываем
                //ищем карточку из массива, в которую мы закидываем текущую
                if (c.id === card.id) {
                    //мы присваиваем карточке, которая лежит, порядковый номер карты, которую мы держим
                    return {...c, order: currenCard ? currenCard.order : c.order}
                }
                //а карточке, которую мы держим - порядковый номер карты, на которую ходим скинуть ее
                if (currenCard && c.id === currenCard.id) {
                    return {...c, order: card.order}
                }
                return c
            }
        ))
        e.currentTarget.style.backgroundColor='white'
    }
    const sortCards = (a:cardType,b:cardType) => a.order > b.order?  1: -1


    return (<>
            {
                cardList.sort(sortCards).map(c => <div key={c.id}
                                                       className={s.card}
                                                       draggable={true}
                                                       onDragStart={(e)=> dragStartHandler(e, c)} //сработывает, когда мы взяли карточку
                                                       onDragLeave={(e)=> dragEndHandler(e)} //сработывает, если мы вышли за пределы др карточки
                                                       onDragEnd={(e)=> dragEndHandler(e)} //сработывает, если мы отпустили перемещение
                                                       onDragOver={(e)=> dragOverHandler(e)} // если находимся над др объектом
                                                       onDrop={(e)=> dropHandler(e, c)} // отпустили карточку и рассчитываем, что произойдет др действие
                >
                    {c.text}
                </div>)
            }
        </>
    );
}

export default SimpleDNDcards;
