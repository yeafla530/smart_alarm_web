import axios from 'axios';

const SERVER = 'https://dev.aistudios.com/api/odin'
const headers = {
    "content-Type": "application/json",
    // Authorization: "JWT fetching..."
}

export default async (req, res) => {
	const { method } = req;
    console.log('???')

	switch (method) {
		case "GET":
			try {

			} catch (error) {
				console.log(error)
				return res.status(400).json({
					success: false,
					error: error
				});
			}
		case "POST":
			try {
                console.log('modelVieoApi')
                console.log(req.body.language)
				console.log(req.body.text)
				console.log(req.body.model)
				let token = req.body.token
                const keyResponse = await axios.post(`${SERVER}/makeVideo`, 
					{
						appId:"aistudios.com",
						platform:"web",
						isClientToken:true,
						token: token,
						uuid:"6443234b-77d5-4013-bfd6-bb9399f317d9",
						sdk_v:"1.0",
						clientHostname:"aistudios.com",
						language: req.body.language,
						text: req.body.text,
						model: req.body.model,
						clothes: "1"
					},
					{headers}
				)
				console.log(9)
				// return res.status(200).json(keyResponse.data)
				// console.log(keyResponse.data)
				// console.log(keyResponse.data.data.key)
				// const videoKey = await keyResponse.json()
				const videoKey = keyResponse.data.data.key
				console.log(videoKey)
				// console.log(videoKey.data.key)
				
				let flag ="waiting"
				while (true){
					console.log(1)
					if (flag ==="waiting" || flag !== 100){
						console.log(2)
						const videoResponse = await fetch("https://dev.aistudios.com/api/odin/findProject",{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"appId":"aistudios.com",
								"platform":"web",
								"isClientToken":true,
								"token":token,
								"uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9",
								"sdk_v":"1.0",
								"clientHostname":"aistudios.com",
								"key": videoKey
							}),
						})
						console.log(3)
						const videoUrl = await videoResponse.json()
						flag = videoUrl.data.progress
						console.log(flag)
					}else{
						console.log('endendend')
						const videoResponse = await fetch("https://dev.aistudios.com/api/odin/findProject",{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"appId":"aistudios.com",
								"platform":"web",
								"isClientToken":true,
								"token":token,
								"uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9",
								"sdk_v":"1.0",
								"clientHostname":"aistudios.com",
								"key": videoKey
							}),
						})
						console.log(3)
						const videoUrl = await videoResponse.json()
						console.log(videoUrl)
						console.log('endendend')
						break
					}
				}

				console.log(videoUrl)

				return res.status(201).json(videoUrl);

                // return res.status(200).json(keyResponse.data)
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};