/**
 * @openapi
 * /users
 *   get:
 *         summary: 회원 목록조회, _id와 이름, 이메일, 핸드폰번호, 주민등록번호, 비밀번호, 좋아하는 사이트(og 정보 포함)가 반환됩니다.
 *         tags: [Users]
 *         parameters:
 *          -in: body
 *          name: users
 *          type: object
 *         responses:
 *              200:
 *                  description: 회원목록조회 성공
 *                  content:
 *                       application/json:
 *                          schema:
 *                              type: array     
 *                              items: 
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          example: "507f191e810c19729de860ea"
 *                                      email:
 *                                          type: string
 *                                          example: aaa@aaaaa.com
 *                                      name:
 *                                          type: string
 *                                          example: "박에이"
 *                                      phone:
 *                                          type: string
 *                                          example: "01012345678"
 *                                      personal:
 *                                          type: string
 *                                          example: "980223-2158963"
 *                                      prefer:
 *                                          type: string
 *                                          example: https://netflix.com
 *                                      pwd:
 *                                          type: string
 *                                          example: "qwer1234"
 *                                      og:
 *                                          type: Object
 *                                          properties:
 *                                              title:
 *                                                  type: string
 *                                                  example: "네이버"
 *                                              description:
 *                                                  type: string
 *                                                  example: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                                              image:
 *                                                  type: string
 *                                                  example: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                                              
 */
/**
 * @openapi
 * /users
 *   post:
 *         summary: json방식으로 신규 회원을 등록합니다. 이름과 이메일, 주민등록번호, 좋아하는 사이트, 핸드폰번호, 비밀번호를 기재하여 보내면 _id가 반환됩니다.
 *         tags: [Users]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 name:
 *                                     type: string
 *                                     required: true
 *                                     example: 김다혜
 *                                 email:
 *                                     type: string
 *                                     required: true
 *                                     example: aaa@gmail.com
 *                                 personal:
 *                                     type: string
 *                                     required: true
 *                                     example: 900408-1111111
 *                                 prefer:
 *                                     type: string
 *                                     required: true
 *                                     example: "http://netfilx.com"
 *                                 pwd:
 *                                     type: string
 *                                     required: true
 *                                     example: "qwer1234"
 *                                 phone: 
 *                                     type: string
 *                                     required: true
 *                                     example: "01012340093"
 *         response:
 *              '200':
 *                      description: user의 _id 리턴
 *                      content:
 *                          application/json:
 *                             schema:
 *                               type: string
 *                               example: "507f191e810c19729de860ea"
 */