/**
 * @openapi
 * /users:
 *   get:
 *         summary: 회원목록조회
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
 *                                          example: 철수
 *                                      phone:
 *                                          type: string
 *                                          example: "01012345678"
 *                                      personal:
 *                                          type: string
 *                                          example: "980223-2158963"
 *                                      prefer:
 *                                          type: string
 *                                          example: https://netflix.com
 */

/**
 * @openapi
 * /boards:
 *   post:
 *         summary: 회원 등록하기
 *         response:
 *              200:
  *                 description: 회원등록 성공
 */