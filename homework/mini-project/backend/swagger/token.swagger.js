/**
 * @openapi
 * /tokens/phone:
 *   post:
 *         summary: 토큰 인증 요청 API / 핸드폰 토큰 전송, 핸드폰 번호와 인증번호, 인증번호 일치 여부 확인
 *         tags: [Tokens]
 *         parameters:
 *          -in: body
 *            name: tokens
 *            description: 토큰
 *            schema:
 *              type: object
 *              required
 *                  -phone
 *              properties:
 *                  phone:
 *                      type: string
 *         response:
 *           200: 
 *              description: "인증번호가 전송되었습니다."
 *          
 *                                              
 */
/**
 * @openapi
 * /tokens/phone:
 *   patch:
 *         summary: 인증번호가 일치하면 DB의 isAuth를 true로 수정합니다.
 *         tags: [Tokens]
 *         response:
 *              200:
 *                 description: "인증번호를 확인해주세요."
 *              422:
 *                 description: "휴대폰 인증이 완료되었습니다."
 */