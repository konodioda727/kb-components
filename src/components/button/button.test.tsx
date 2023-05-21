import React from 'react'
import { render,fireEvent } from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'
import { FileWatcherEventKind } from 'typescript'

const defaultProps = {
    onClick: jest.fn()
    // jest.fn()生成虚拟调用函数
}
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}
const disabledProps: ButtonProps = {
    disabled:true,
    onClick: jest.fn()
}

describe('test button component', ()=>{
    it('should render default button', ()=>{
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        // 强制类型断言，判断element为button元素，这样就可以用button的方法
        expect(element).toBeInTheDocument()

        // 判断button是否正常生成
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
        
        // 判断disabled是否正常
        expect(element.disabled).toBeFalsy()
    })
    it('should render buttons with different props', ()=>{
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()

        // 测试不同props下能否正常渲染组件
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    it('should render a link', ()=>{
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">link</Button>)
        const element = wrapper.getByText('link')
        expect(element).toBeInTheDocument()

        // 判断是否正常生成link
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button', ()=>{
        const wrapper = render(<Button {...disabledProps}>link</Button>)
        const element = wrapper.getByText('link') as HTMLButtonElement
        expect(element).toBeInTheDocument()

        // 判断disabled是否正常
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})