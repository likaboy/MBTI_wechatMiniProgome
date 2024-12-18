import {View, Image} from '@tarojs/components'
import './index.scss'
import {AtButton} from "taro-ui";
import headerBg from '../../assets/headerBg.jpg'
import GlobalFooter from "../../components/GlobalFooter";
import Taro from "@tarojs/taro";

export default () => {
  return (
    <View className="indexPage">
      <View className='at-article__h1 title'>
        MBTI 性格测试
      </View>
      <View className='at-article__h2 subTitle'>
        只需两分钟，就可以非常准确的描述出你的性格特点
      </View>
      <AtButton className='enterButton' type='primary' circle={true} onClick={
        () => {
          Taro.navigateTo( {
            url: '/pages/doQuestion/index'
          })
        }
      }>开始测试</AtButton>
      <Image src={headerBg}/>
      <GlobalFooter></GlobalFooter>
    </View>
  );
};
