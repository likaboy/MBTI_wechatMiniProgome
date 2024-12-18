import {View} from '@tarojs/components'
import GlobalFooter from "../../components/GlobalFooter";
import {AtButton, AtRadio} from "taro-ui";
import './index.scss'
import questions from '../../data/questions.json';
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";

export default () => {
  const question = questions[0];
  // 当前题目序号 从1开始
  const [current, setCurrent] = useState<number>(1);
  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const questionIOptions = currentQuestion.options.map(option => {
    return {label: `${option.key}.${option.value}`, value: option.key};
  });

  // 当前答案
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  // 回答列表
  const [answerList] = useState<string[]>([]);

  // 序列号变化时，切换当前题目和当前回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1])
  }), [current];

  return (
    <View className="qoQuestionPage">
      {/*{JSON.stringify(answerList)}*/}
      <View className='at-article__h2 title'>{current}、{question.title}</View>
      <AtRadio className='options_wrapper' options={questionIOptions}
               value={currentAnswer}
               onClick={(value) => {
                 // 设置回答
                 setCurrentAnswer(value);
                 // 记录回答答案
                 answerList[current - 1] = value;
               }}
      />
      {
        (current < questions.length) &&
        <AtButton className='controlBtn' type='primary' circle={true} disabled={!currentAnswer}
                  onClick={() => setCurrent(current + 1)}>下一题</AtButton>
      }
      {
        (current === questions.length) &&
        <AtButton className='controlBtn' type='primary' circle={true}
                  disabled={!currentAnswer} onClick={() => {

          // 将答案列表存储在本地列表中
          Taro.setStorageSync("answerList", answerList);
          // 跳转到结果页面
          Taro.reLaunch({
            url: '/pages/result/index'
          })
        }}>查看结果</AtButton>
      }
      {
        (current > 1) &&
        <AtButton className='controlBtn up' circle={true}
                  onClick={() => setCurrent(current - 1)}>上一题</AtButton>
      }

      <GlobalFooter></GlobalFooter>
    </View>
  );
};
