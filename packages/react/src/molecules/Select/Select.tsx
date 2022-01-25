import React, { createRef, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import Text from '../../atoms/Text';

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  ESC: 27,
}
interface SelectOption {
  label: string,
  value: string,
}

interface RenderOptionProps {
  isSelected: boolean,
  option: SelectOption,
  getOptionRecommendedProps: (overrideProps?: Object) => Object,
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
  options?: SelectOption[],
  label?: string,
  renderOption?: (props: RenderOptionProps) => React.ReactNode,
}

const getNextOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === options.length - 1) {
    return 0;
  }
  return currentIndex + 1;
}

const getPreviousOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === 0) {
    return options.length - 1;
  }
  return currentIndex - 1;
}

const Select: React.FunctionComponent<SelectProps> = ({ options = [], label = 'Please select one option', onOptionSelected: handler, renderOption }) => {
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setOverlayTop((
      labelRef.current?.offsetHeight || 0
    ) + 10);
  }, [labelRef.current?.offsetHeight])

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  const highlightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  }

  const onButtonKeyDown: KeyboardEventHandler = (e) => {
    e.preventDefault();

    if([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(e.keyCode)) {
      setIsOpen(true);

      highlightItem(0);
    }
  }

  useEffect(() => {
    setOptionRefs(options.map(_ => createRef<HTMLLIElement>()));
  }, [optionRefs.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  
  }, [isOpen, highlightedIndex]);

  const onOptionKeyDown: KeyboardEventHandler = (e) => {
    if (e.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    if (e.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightItem(getNextOptionIndex(highlightedIndex, options));
    }

    if (e.keyCode === KEY_CODES.UP_ARROW) {
      highlightItem(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (e.keyCode === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  }

  return (
    <div className="dse-select">
      <button onKeyDown={onButtonKeyDown} aria-controls="dse-select-list" aria-haspopup={true} aria-expanded={isOpen ? true : undefined} ref={labelRef} className="dse-select__label" onClick={() => onLabelClick()}>
        <Text>{selectedIndex === null ? label : selectedOption?.label}</Text>
        <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`} width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <ul role="menu" id="dse-select-list" style={{ top: overlayTop }} className="dse-select__overlay">
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighLighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: 'menuitemradio',
                  'aria-label': option.label,
                  'aria-checked': isSelected ? true : undefined,
                  onKeyDown: onOptionKeyDown,
                  tabIndex: isHighLighted ? -1 : 0,
                  className: `dse-select__option ${isSelected && 'dse-select__option--selected'} ${isHighLighted && 'dse-select__option--highlighted'}`,
                  onMouseEnter: () => highlightItem(optionIndex),
                  onMouseLeave: () => highlightItem(null),
                  onClick: () => onOptionSelected(option, optionIndex),
                  key: option.value,
                  ...overrideProps,
                }
              }
            }
            if (renderOption) {
              return renderOption(renderOptionProps)
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && <svg width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )}

export default Select;