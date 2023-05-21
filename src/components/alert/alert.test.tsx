import React from 'react'
import { render,fireEvent } from '@testing-library/react'
import Alert, { AlertProps, AlertType } from './alert'


const testProps: AlertProps = {
    title: 'title',
  }
  
  const typeProps: AlertProps = {
    ...testProps,
    type: 'success',
    description: 'hello',
    closable: false
  }
describe('test alert component', ()=>{
    it('should render default alert types',()=>{
        const { getByText, container, queryByText } = render(<Alert {...testProps}/>)
        expect(queryByText('title')).toBeInTheDocument()
        expect(container.querySelector('.alert')).toHaveClass('alert-default')
        
    })
    it('should render title or description or cloasable',()=>{
        const { getByText, container, queryByText } = render(<Alert {...typeProps}/>)
        expect(getByText('hello')).toBeInTheDocument()
        expect(getByText('title')).toHaveClass('alertTitle')
        expect(container.querySelector('.alert')).toHaveClass('alert-show')
    })
})