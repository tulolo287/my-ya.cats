import type { Request, Response } from 'express'
import { ReactionService } from '../services/reaction-service'
import { isNumber } from '../utils/is-number'
import type { RequestWithUser } from '../services/auth-service'

export class ReactionController {
  static service = new ReactionService()

  static handleBadRequest = (response: Response, message: string) => {
    response.status(400).send(message)
  }

  static handleServerError = (response: Response, error: unknown) => {
    console.error(error)
    response.status(500).send('Internal Server Error')
  }

  /**
   * Получить реакции на комент
   */
  public static getTopicReactions = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { commentId } = request.params
      const { currentUser } = request as RequestWithUser
      const userId = currentUser.id

      if (!isNumber(commentId)) {
        return this.handleBadRequest(
          response,
          'Parameter commentId should be a number'
        )
      }

      const reactions = await this.service.getTopicReactions(
        Number.parseInt(commentId),
        userId
      )

      response.status(200).send(reactions)
    } catch (error) {
      this.handleServerError(response, error)
    }
  }

  /**
   * Добавить реакцию на комент
   */
  public static addReactionToTopic = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { commentId, emojiId } = request.body
      const { currentUser } = request as RequestWithUser
      const userId = currentUser.id

      if (!isNumber(commentId)) {
        return this.handleBadRequest(response, 'commentId should be a number')
      }

      if (!emojiId || emojiId.trim() === '') {
        return this.handleBadRequest(response, 'emojiId should not be empty')
      }

      const res = await this.service.addReactionToTopic(
        commentId,
        emojiId,
        userId
      )
      if (res === true) {
        response.status(200).send('Reaction successfully created')
      } else {
        return this.handleBadRequest(response, 'Unable to add reaction')
      }
    } catch (error) {
      this.handleServerError(response, error)
    }
  }

  /**
   * Удалить реакцию на комент
   */
  public static deleteReactionFromTopic = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { commentId, emojiId } = request.body

      const { currentUser } = request as RequestWithUser
      const userId = currentUser.id

      if (!isNumber(commentId)) {
        return this.handleBadRequest(response, 'commentId should be a number')
      }

      if (!emojiId || emojiId.trim() === '') {
        return this.handleBadRequest(response, 'emojiId should not be empty')
      }

      const res = await this.service.deleteReactionFromTopic(
        commentId,
        emojiId,
        userId
      )
      if (res === true) {
        response.status(200).send('Reaction successfully deleted')
      } else {
        return this.handleBadRequest(response, 'Reaction not found')
      }
    } catch (error) {
      this.handleServerError(response, error)
    }
  }
}
