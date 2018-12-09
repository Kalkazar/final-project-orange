import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FILES_PER_PAGE } from '../../ducks/ui.duck'
import { connect } from 'react-redux'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}

class Pagination extends Component {
  constructor (props) {
    super(props)
    const {
      totalRecords = null,
      pageLimit = FILES_PER_PAGE,
      pageNeighbours = 0,
      currentPage
    } = props

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0
    // this.totalPages = Math.ceil(this.totalRecords / this.pageLimit)
    this.totalPages = this.props.totalPages
    this.state = { currentPage }
  }

  fetchPageNumbers = () => {
    const totalPages = this.totalPages
    const currentPage = this.state.currentPage
    const pageNeighbours = this.pageNeighbours
    const totalNumbers = this.pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }
      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  render () {
    const { currentPage } = this.state
    const pages = new Array(this.props.totalPages).fill(0).map((e, i) => i + 1)

    return (
      <Fragment>
        <nav>
          <ul className='pagination'>
            {pages.map((page, index) => {
              return (
                <li
                  key={index}
                  className={`page-item${
                    this.props.currentPage - 1 === index ? 'active' : ' '
                  }`}
                >
                  <a
                    className='page-link'
                    href='#'
                    onClick={() => this.props.setPage(index)}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </Fragment>
    )
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func
}

export default Pagination
