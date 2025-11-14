export async function POST(req) {
  try {
    const formData = await req.formData();

    const project = {
      title: formData.get("title"),
      description: formData.get("description"),
      img: formData.get("img"),
      link: formData.get("link"),
      keywords: JSON.parse(formData.get("keywords") || "[]"),
    };

    console.log("📌 New Project Submitted:", project);

    return Response.json({ ok: true, project }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false }, { status: 400 });
  }
}
