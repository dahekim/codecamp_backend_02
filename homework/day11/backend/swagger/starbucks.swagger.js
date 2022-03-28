/**
 * @openapi
 * /starbucks:
 *   get:
 *         summary: 커피 리스트 조회
 *         tags: [coffeeLists]
 *         parameters:
 *          -in: query
 *          name: drink
 *          type: string
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
 *                                          example: 아이스 카페 아메리카노
 *                                      img:
 *                                          type: string
 *                                          example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg
 *                                      
 */