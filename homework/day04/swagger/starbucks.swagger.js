/**
 * @openapi
 * /starbucks:
 *   get:
 *         summary: 커피 리스트
 *         tags: [coffeeList]
 *         parameters:
 *          -in: query
 *          name: number
 *          type: int
 *         responses:
 *              200:
 *                  description: 메뉴목록조회 성공
 *                  content:
 *                       application/json:
 *                          schema:
 *                              type: array     
 *                              items: 
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                          example: 아메리카노
 *                                      calorie:
 *                                          type: int
 *                                          example: 250
 *                                      
 */

/**
 * @openapi
 * /boards:
 *   post:
 *         summary: 메뉴 등록하기
 *         response:
 *              200:
  *                 description: 메뉴등록 성공
 */