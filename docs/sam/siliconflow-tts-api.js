const axios = require('axios');
const fs = require('fs');
const url = 'https://api.siliconflow.cn/v1/audio/speech';
const data = {
    max_tokens: 2048,
    sample_rate: 32000,
    speed: 1,
    gain: 0,
    model: "IndexTeam/IndexTTS-2",
    input: "你站在桥上看风景，看风景的人在楼上看你。明月装饰了你的窗子，你装饰了别人的梦",
    voice: "IndexTeam/IndexTTS-2:anna",
    response_format: "mp3",
    stream: true,
    
};

const config = {
    method: 'post',
    url: url,
    headers: {
        'Authorization': 'Bearer sk-xx', // 请替换为您的真实 API Key
        'Content-Type': 'application/json'
    },
    data: data,
    responseType: 'stream' // 重要：设置响应类型为流
};
axios(config)
    .then(function (response) {
        // 将流式数据写入文件
        const writer = fs.createWriteStream('output.mp3');
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log('音频已成功保存为 output.mp3');
        });
        
        writer.on('error', (err) => {
            console.error('写入文件时出错:', err);
        });
    })
    .catch(function (error) {
        console.error('请求失败:', error.message);
        if (error.response) {
            console.error('状态码:', error.response.status);
        }
    });