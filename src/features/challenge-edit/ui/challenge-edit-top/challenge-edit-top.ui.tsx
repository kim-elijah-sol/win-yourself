import clsx from 'clsx';
import {
  createEffect,
  createSignal,
  on,
  type Accessor,
  type Component,
  type Setter,
} from 'solid-js';
import { Check, X } from '~/shared/ui';
import './challenge-edit-top.ui.css';

type Props = {
  close: () => void;
  title: Accessor<string>;
  setTitle: Setter<string>;
};

export const ChallengeEditTop: Component<Props> = (props) => {
  let isCloseable = true;

  const [titleValue, setTitleValue] = createSignal(props.title());

  const [titleWidth, setTitleWidth] = createSignal(0);

  const [isFocused, setIsFocused] = createSignal(false);

  createEffect(
    on(props.title, () => {
      setTitleWidth(
        document.querySelector('#title-width-tracker')?.clientWidth ?? 0
      );
    })
  );

  return (
    <div class='absolute flex items-center justify-between left-0 right-0 top-0 p-4 pb-2 bg-white/75 backdrop-blur-sm'>
      <input
        id='title-input'
        type='text'
        class='font-semibold text-xl py-2 px-3 rounded-[18px] bg-slate-100 transition-all heurm-challenge-edit-top-input'
        value={titleValue()}
        onInput={(e) => setTitleValue(e.target.value)}
        onBlur={() => {
          const nextTitle = titleValue().trim();

          if (nextTitle) {
            props.setTitle(nextTitle);
          } else {
            setTitleValue(props.title());
          }

          setIsFocused(false);
          setTimeout(() => {
            isCloseable = true;
          }, 200);
        }}
        onFocus={() => {
          setIsFocused(true);
          isCloseable = false;
        }}
        maxLength={16}
        style={{
          width: `${titleWidth()}px`,
        }}
      />
      <button
        onClick={() => {
          if (isCloseable) {
            props.close();
          }
        }}
        class={clsx(
          'p-[7px] rounded-[42%] transition-all active:scale-[.95]',
          isFocused()
            ? 'bg-green-400 active:bg-green-500'
            : 'bg-red-400 active:bg-red-500'
        )}
      >
        {isFocused() ? <Check size={30} /> : <X size={30} />}
      </button>
      <p
        class='font-semibold text-xl py-2 px-3 rounded-[12px] bg-slate-100 transition-all w-fit fixed left-[-3141592px] top-[-3141592px]'
        id='title-width-tracker'
      >
        {props.title()}
      </p>
    </div>
  );
};
