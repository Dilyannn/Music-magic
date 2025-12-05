export default function(el) {
  const element = document.getElementById(`${el}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
