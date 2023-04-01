const Redis = require('ioredis')

const redis = new Redis({
	port: 6379,
	host: '127.0.0.1',
})

// 简单的一个列表 热度排序的Demo
const num = Math.round(Math.random() * 30 + 1)
const str = 'abcdefghkjlwer'
const strtap = Math.round(Math.random() * 11 + 1)
async function jihe() {
	const data = await redis.zscore('hots', str[strtap])
	if (data) {
		redis.zincrby('hots', 1, str[strtap])
		console.log(str[strtap] + '1')
	} else {
		const write = await redis.zadd('hots', num, str[strtap])
		console.log(str[strtap] + `${write}写入成功`)
	}
	// 获取排序
	const sort = await redis.zrevrange(
		'hots',
		0,
		-1,
		//
		'WITHSCORES'
	)
	// 分类为对象
	const obj = {}
	for (let i = 0; i < sort.length; i += 2) {
		obj[sort[i]] = sort[i + 1]
	}
	console.log(obj)
}

jihe()
