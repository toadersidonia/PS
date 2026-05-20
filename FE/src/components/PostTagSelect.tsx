import CreatableSelect from "react-select/creatable";

export type TagOption = {
  label: string;
  value: string;
};

type Props = {
  options: TagOption[];
  value: TagOption[];
  onChange: (val: TagOption[]) => void;
};

export default function PostTagSelect({ options, value, onChange }: Props) {
  return (
    <CreatableSelect<TagOption, true>
      isMulti
      options={options}
      value={value}
      onChange={(val) => onChange((val as TagOption[]) || [])}
      placeholder="Add tags..."
    />
  );
}