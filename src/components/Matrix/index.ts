import {
  DEFAULT_COLS, DEFAULT_ROWS,
} from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import {
  BaseResponseAreaProps, BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ResponseAreaTub } from '@lambda-feedback-segp-sandbox/response-area-base/types/response-area-tub'
import _ from 'lodash'
import { z } from 'zod'

import { padMatrixFromRowsAndCols } from './helpers'
import { Matrix } from './Matrix.component'
import { matrixConfigSchema, matrixResponseAnswerSchema } from './Matrix.schema'
import { MatrixWizard } from './MatrixWizard.component'

export const defaultMatrixAnswer = {
  rows: DEFAULT_ROWS, cols: DEFAULT_COLS, type: 'MATRIX' as const, answers: padMatrixFromRowsAndCols({
    rows: DEFAULT_ROWS, cols: DEFAULT_COLS,
  }),
}

export class MyResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'MATRIX'
  public readonly displayWideInput = true
  protected configSchema = matrixConfigSchema
  public config?: z.infer<typeof matrixConfigSchema>
  protected answerSchema = matrixResponseAnswerSchema
  public answer?: z.infer<typeof matrixResponseAnswerSchema>

  initWithDefault = () => {
    this.config = {
      rows: DEFAULT_ROWS, cols: DEFAULT_COLS,
    }
    this.answer = padMatrixFromRowsAndCols({
      rows: DEFAULT_ROWS, cols: DEFAULT_COLS,
    })
  }

  InputComponent = (props: BaseResponseAreaProps) => {
    if (!this.config) throw new Error('Config missing')

    return Matrix({
      ...props, config: this.config,
    })
  }

  WizardComponent = (props: BaseResponseAreaWizardProps) => {
    if (!this.config) throw new Error('Config missing')
    if (this.answer === undefined) throw new Error('Answer missing')

    return MatrixWizard({
      ...props, config: this.config, answer: this.answer,
    })
  }

  protected extractAnswer = (provided: any): void => {
    if (!this.config) throw new Error('Config missing')
    if (!Array.isArray(provided)) throw new Error('Answer is not an array')

    // legacy handling: answer used to be stored as a one-dimensional array. This
    // checks which format the answer is in and converts it to a two-dimensional
    // array if necessary
    const isChuncked = Array.isArray(provided[0])
    let answerToParse: z.infer<typeof matrixResponseAnswerSchema>
    if (isChuncked) {
      answerToParse = provided
    } else {
      answerToParse = _.chunk(provided, this.config.cols)
    }
    const parsedAnswer = this.answerSchema.safeParse(answerToParse)
    if (!parsedAnswer.success) throw new Error('Could not extract answer')

    this.answer = parsedAnswer.data
  }
}
