/**
 * @openapi
 * /users:
 *   get:
 *         summary: 회원 목록조회
 *         tags: [User]
 *         parameters:
 *          -in: query
 *          name: number
 *          type: int
 *         responses:
 *              200:
 *                  description: 회원목록조회 성공
 *                  content:
 *                       application/json:
 *                          schema:
 *                              type: array     
 *                              items: 
 *                                  properties:
 *                                      email:
 *                                          type: string
 *                                          example: aaa@aaaaa.com
 *                                      name:
 *                                          type: string
 *                                          example: 박에이
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
 *                                          example: qwer1234"
 *                                      og:
 *                                          type: object
 *                                          properties:
 *                                              title:
 *                                                  type: string
 *                                                  example: 네이버
 *                                              description:
 *                                                  type: string
 *                                                  example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                              image:
 *                                                  type: string
 *                                                  example: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                                              
 */

/**
 * @openapi
 * /user:
 *   post:
 *         summary: 회원 등록하기
 *         response:
 *              200:
  *                 description: 회원등록 성공
 */