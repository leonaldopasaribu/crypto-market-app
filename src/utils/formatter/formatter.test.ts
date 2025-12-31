import { FormatterUtil } from './formatter'

describe('FormatterUtil', () => {
  describe('formatCurrency', () => {
    it('should return formatted currency when given USD value', () => {
      expect(FormatterUtil.formatCurrency(1234.56, 'usd')).toBe('$1,234.56')
    })

    it('should return formatted currency when given IDR value', () => {
      const result = FormatterUtil.formatCurrency(1_234_567, 'idr')
      expect(result).toContain('Rp')
      expect(result).toContain('1.234.567')
    })

    it('should return USD format when no currency parameter is provided', () => {
      expect(FormatterUtil.formatCurrency(100)).toBe('$100.00')
    })
  })

  describe('formatLargeNumber', () => {
    it('should return abbreviated format when value is in trillions', () => {
      expect(FormatterUtil.formatLargeNumber(1_500_000_000_000, 'usd')).toBe('$1.50T')
    })

    it('should return abbreviated format when value is in billions', () => {
      expect(FormatterUtil.formatLargeNumber(2_500_000_000, 'usd')).toBe('$2.50B')
    })

    it('should return abbreviated format when value is in millions', () => {
      expect(FormatterUtil.formatLargeNumber(3_500_000, 'usd')).toBe('$3.50M')
    })

    it('should return full currency format when value is less than million', () => {
      expect(FormatterUtil.formatLargeNumber(999_999, 'usd')).toBe('$999,999.00')
    })

    it('should return IDR symbol when given IDR currency', () => {
      expect(FormatterUtil.formatLargeNumber(1_500_000_000, 'idr')).toBe('Rp1.50B')
    })
  })

  describe('formatPercentage', () => {
    it('should return percentage with plus sign when value is positive', () => {
      expect(FormatterUtil.formatPercentage(5.25)).toBe('+5.25%')
    })

    it('should return percentage with minus sign when value is negative', () => {
      expect(FormatterUtil.formatPercentage(-3.75)).toBe('-3.75%')
    })

    it('should return percentage with plus sign when value is zero', () => {
      expect(FormatterUtil.formatPercentage(0)).toBe('+0.00%')
    })

    it('should return N/A when value is null', () => {
      expect(FormatterUtil.formatPercentage(null)).toBe('N/A')
    })

    it('should return N/A when value is undefined', () => {
      expect(FormatterUtil.formatPercentage(undefined)).toBe('N/A')
    })
  })
})
