import React from 'react'
import TableComponentPresentational from './TableComponentPresentational'

export default function TableComponentContainer({ requests }) {
    return (
        <TableComponentPresentational requests={requests} />
    )
}
