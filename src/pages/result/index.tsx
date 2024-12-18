import {View, Image} from '@tarojs/components'
import './index.scss'
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import headerBg from '../../assets/headerBg.jpg'
import GlobalFooter from "../../components/GlobalFooter";
import {getBestQuestionResult} from "../../utils/bizUtils";
import questions from "../../data/questions.json";
import questionResults from "../../data/question_results.json";

export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length < 0) {
    Taro.showToast({
      title: '答案为空',
      icon: 'error',
      duration: 3000
    })
  }

  // 获取测试结果
  const result = getBestQuestionResult(answerList, questions, questionResults);
  return (
    <View className="resultPage">
      <View className='at-article__h1 title'>
        {result.resultName}
      </View>
      <View className='at-article__h2 subTitle'>
        {result.resultDesc}
      </View>
      <AtButton className='enterButton' type='primary' circle={true} onClick={() => {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }}>返回主页</AtButton>
      <Image src={headerBg}/>
      <GlobalFooter></GlobalFooter>
    </View>
  );
};
