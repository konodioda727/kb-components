import React, { useEffect, useState } from 'react';
// import './App.css';
import Hello from './first/helloworld';
import Cocurrent from './first/cocurrent'
import Button, {ButtonSize, ButtonType} from './components/button/button';
import Alert from './components/alert/alert';
import Menu from './components/menu/menu';
import MenuItem from './components/menu/menuItem';
import SubMenu from './components/menu/subMenu';
import Tabs from './components/tabs/tabs';
import TabItem from './components/tabs/tabItem';
import Transition from './components/transition/transition';
import Upload from './components/upload/upload';
import { Icon } from './components/icon/icon';
import { library, Library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios'
// 保存所有fontawesome 图标
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

function App() {
  const [show,setshow] = useState(false)
  useEffect(() => {
    axios({
      method:'post',
      url:'https://jsonplaceholder.typicode.com/posts',
      data:JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((res)=>{console.log(res);
    })

})
  return (
    <div className="App">
      
        {/* 按钮 */}
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} disabled={true} href="http://www.baidu.com">World</Button>
        <Button btnType={ButtonType.Link} disabled = {true}>AnchorButtonProps</Button>
        <Button size={ButtonSize.Small} onClick={()=>{setshow(!show)}}>click me</Button>
        <Transition in={show} timeout={200} animation={'zoom-in-bottom'}>
          <div>
          <div>1293u120974012</div>
          <div>1293u120974012</div>
          <div>1293u120974012</div>
          <div>1293u120974012</div>
          </div>
        </Transition>


        <Hello message='hello'></Hello>
        <Cocurrent></Cocurrent>

        {/* 警示框 */}
        <Alert title='wo' description='shuai' closable = {true} type='warning'></Alert>
        

        {/* 菜单栏 */}
        <Menu mode='horizonal' defaultOpenSubMenus={['0']}>

          <SubMenu title='text'>

            <MenuItem >123</MenuItem>
            <MenuItem >123</MenuItem>
            <MenuItem  disabled>123123</MenuItem>

          </SubMenu>

          <SubMenu title='text'>

            <MenuItem >123</MenuItem>
            <MenuItem >123</MenuItem>
            <MenuItem  disabled>123123</MenuItem>

          </SubMenu>

        </Menu>
        <Menu onSelect={(index)=>{
            alert(index)
          }} mode ='vertical'>
          <MenuItem >123</MenuItem>
          <MenuItem >123</MenuItem>
          <MenuItem  disabled> 123123</MenuItem>
        </Menu>


          {/* 选项卡 */}
        <Tabs>
          <TabItem title='title'>123</TabItem>
          <TabItem title='title2'>123</TabItem>
        </Tabs>

          {/* 图标 */}
        <Icon icon='coffee' color="danger" size = 'lg'></Icon>
          
          {/* 上传 */}
          <Upload action='https://jsonplaceholder.typicode.com/posts' drag></Upload>
    </div>
  );
}

export default App;
