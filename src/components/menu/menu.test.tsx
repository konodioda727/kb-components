import React, { Children } from 'react'
import { render,fireEvent } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import { MenuItemProps } from './menuItem'
const testMenuProps:MenuProps = {
    activeIndex: "0",
    children:<div>269851</div> ,
    mode:'vertical',
}

test('should have default values',()=>{
    const {getByText, queryByText, container} = render(<Menu>123</Menu>)
    expect(queryByText('123')).toBeInTheDocument()
    expect(queryByText('123')).toHaveClass('menu-horizonal')
})
test('should render with different values',()=>{
    const {getByText, queryByText, container} = render(<Menu {...testMenuProps}></Menu>)
    expect(queryByText('269851')).toBeInTheDocument()
    expect(container.querySelector('.menu')).toHaveClass('menu-vertical')
})
