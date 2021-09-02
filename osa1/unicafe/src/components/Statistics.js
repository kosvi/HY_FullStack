import React from 'react'
import Header from './Header'
import ResultLine from './ResultLine'

const Statistics = (props) => {

    const [good, neutral, bad] = props.arvot

    return (
        <>
            <Header teksti={props.otsikko} />
            <ResultLine nimi="good" arvo={good} />
            <ResultLine nimi="neutral" arvo={neutral} />
            <ResultLine nimi="bad" arvo={bad} />
            <ResultLine nimi="all" arvo={good + neutral + bad} />
            <ResultLine nimi="average" arvo={((good - bad) / (good + neutral + bad)).toFixed(2)} />
            <ResultLine nimi="positive" arvo={(good * 100 / (good + neutral + bad)).toFixed(2)} />
        </>
    )
}

export default Statistics